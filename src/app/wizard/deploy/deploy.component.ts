import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { History, StatusMessage, StatusEvent } from '../../shared/model';
import { ForgeService } from "../../shared/forge.service";
import { KeycloakService } from "../../shared/keycloak.service";
import { Config } from "../../shared/config.component";

let adocIndex = require('../../../assets/adoc.index');

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent implements OnInit {
  @Input() submittedGuis: History;
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
    private kc: KeycloakService,
    private config: Config) {
    if (!this.apiUrl) {
      this.apiUrl = config.get('mission_control_url');
    }
    if (this.apiUrl && this.apiUrl.endsWith('/')) {
      this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length - 1);
    }
  }

  ngOnInit() {
    this.pageNumbers = Array(this.submittedGuis.stepIndex - 1).fill(1).map((x, i) => i + 1);
  }

  deploy(): void {
    if (this.kc.isAuthenticated()) {
      this.status = Status.Progress;
      this.forgeService.upload(this.command, this.submittedGuis)
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
                this.logError(message.data);
              } else {
                for (let status of this.statusMessages) {
                  if (status.messageKey == message.statusMessage) {
                    status.done = true;
                    status.data =message.data || {};
                    status.data['doc'] = adocIndex[message.statusMessage];
                    break;
                  }
                }

                let done = this.statusMessages[this.statusMessages.length - 1].done;
                if (done) {
                  this.webSocket.close();
                  this.status = Status.Done;
                } 
              }
            }
          }.bind(this);
          this.webSocket.onerror = function(event: MessageEvent) {
            this.logError(event.data.error_description);
          }.bind(this);
        }).catch(reason => {
          if (reason.messages) {
            let message: string = "";
            reason.messages.forEach((error :any) => {
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
      let errorEvent = new StatusMessage("error", "Server error occured");
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
        return key == status.messageKey;
      }
    }
  }

  retry(): void {
    this.webSocket.close();
    this.statusMessages = null;
    this.deploy();
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.submittedGuis);
  }

  restart() {
    this.router.navigate(["../../" + 1, ""], { relativeTo: this.route });
  }

  back() {
    this.router.navigate(["../../" + (this.submittedGuis.stepIndex - 1), this.submittedGuis.toString()], { relativeTo: this.route });
  }

  get downloadOrCD(): boolean {
    return this.submittedGuis.get(1).inputs[0].value == 'ZIP File';
  }
}

enum Status {
  None,
  Progress,
  Done,
  Error
}