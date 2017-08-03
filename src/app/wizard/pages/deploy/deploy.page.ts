import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import { StatusMessage, SubmittableInput } from "../../../shared/model";
import {ForgeService} from "../../../shared/forge.service";
import {KeycloakService} from "../../../shared/keycloak.service";
import {Config} from "../../../shared/config.component";
import {History} from "../../history.component";

@Component({
  selector: "deploy",
  templateUrl: "./deploy.page.html",
  styleUrls: ["./deploy.page.scss"]
})
export class DeployPage implements OnInit {
  @Input() command: string;
  status: Status = Status.None;
  Status = Status;
  pageNumbers: number[];
  statusMessages: StatusMessage[];
  error: string;

  private apiUrl: string = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
  private webSocket: WebSocket;

  constructor(private forgeService: ForgeService,
              private route: ActivatedRoute,
              private router: Router,
              private history: History,
              private kc: KeycloakService,
              private config: Config) {
    if (!this.apiUrl) {
      this.apiUrl = config.get("mission_control_url");
    }
    if (this.apiUrl && (this.apiUrl.startsWith("/") || this.apiUrl.startsWith(":"))) {
      if (this.apiUrl.startsWith(":")) {
        this.apiUrl = location.hostname + this.apiUrl;
      } else {
        this.apiUrl = location.host + this.apiUrl;
      }
      if (location.protocol === "https:") {
        this.apiUrl = "wss://" + this.apiUrl;
      } else {
        this.apiUrl = "ws://" + this.apiUrl;
      }
    }
    if (this.apiUrl && this.apiUrl.endsWith("/")) {
      this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length - 1);
    }
  }

  ngOnInit() {
    this.pageNumbers = Array(this.history.stepIndex - 1).fill(1).map((x, i) => i + 1);
  }

  deploy(): void {
    if (this.kc.isAuthenticated()) {
      this.status = Status.Progress;
      this.forgeService.upload(this.command, this.history)
        .then(status => {
          this.webSocket = new WebSocket(this.apiUrl + status.uuid_link);
          this.webSocket.onmessage = function (event: MessageEvent) {
            if (!this.statusMessages) {
              this.statusMessages = [];
              let values = JSON.parse(event.data);
              for (let item of values) {
                for (let key in item) {
                  let status = new StatusMessage(key, item[key]);
                  this.statusMessages.push(status);
                }
              }
            } else {
              let message = JSON.parse(event.data);
              if (message.data && message.data.error) {
                this.logError(message.data.error);
              } else {
                for (let status of this.statusMessages) {
                  if (status.messageKey === message.statusMessage) {
                    status.done = true;
                    status.data = message.data || {};

                    if (status.data.location != null) {
                      this.history.currentGui.inputs.filter((input:SubmittableInput) =>
                        input.name === status.messageKey)[0].value = status.data.location;
                    }

                    status.data["doc"] = message.statusMessage;
                    break;
                  }
                }

                let done = this.statusMessages[this.statusMessages.length - 1].done;
                if (done) {
                  this.webSocket.close();
                  this.history.currentGui.state.canExecute = true;
                  this.status = Status.Done;
                }
              }
            }
          }.bind(this);
          this.webSocket.onerror = function (event: MessageEvent) {
            this.logError(event.data.error_description);
          }.bind(this);
        }).catch(reason => {
        if (reason.messages) {
          let message: string = "";
          reason.messages.forEach((error: any) => {
            message = message ? message + "; " : message;
            message += error.description;
          });
          this.logError(message);
        } else {
          this.logError(reason);
        }
      });
    } else {
      this.kc.login();
    }
  }

  logError(message: string) {
    this.status = Status.Error;
    this.error = message;
    if (this.webSocket) {
      this.webSocket.close();
    }
    if (!this.statusMessages) {
      this.statusMessages = [];
      let errorEvent = new StatusMessage("error", "Server error occurred");
      errorEvent.data = {error: message};
      this.statusMessages.push(errorEvent);
    } else {
      for (let status of this.statusMessages) {
        if (!status.done) {
          status.data = {error: message};
          break;
        }
      }
    }
  }

  lastNotDone(key: string): boolean {
    for (let status of this.statusMessages) {
      if (!status.done) {
        return key === status.messageKey;
      }
    }
  }

  retry(): void {
    if (this.webSocket != null) this.webSocket.close();
    this.statusMessages = null;
    this.error = null;
    this.deploy();
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.history);
  }

  back() {
    this.router.navigate(["../../" + (this.history.stepIndex - 1), this.history.toString()], {relativeTo: this.route});
  }
}

enum Status {
  None,
  Progress,
  Done,
  Error
}
