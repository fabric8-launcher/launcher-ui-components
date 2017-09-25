import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ForgeService} from "../shared/forge.service";
import {Gui, Input, Message, MetaData} from "../shared/model";
import {History} from "./history.component";
import {KeycloakService} from "../shared/keycloak.service";
import {Subscription} from "rxjs";

@Component({
  selector: "wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"]
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild("wizard") form: NgForm;
  command: string;
  validation: Promise<boolean>;
  sub: Subscription;
  filters: string;  

  constructor(private route: ActivatedRoute,
              private history: History,
              private forgeService: ForgeService,
              private keycloak: KeycloakService) {
  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params=> {

      this.forgeService.filters = params['filters'];
      let state = params["state"];
      this.command = params["command"];
      let stepIndex = +params["step"];

      this.history.resetTo(stepIndex);

      new Array(stepIndex + 1).fill(1).map((_, i) => i + 1).reduce((p, index) => {
        if (stepIndex + 1 === index) {
          return p.then(() => {
            this.history.done();
          });
        }
        if (!this.history.get(index)) {
          return p.then(() => this.forgeService.loadGui(this.command, this.history)).then((gui: Gui) => {
            this.history.add(gui);
            this.history.apply(state);
          }).catch(error => {
            let gui = new Gui();
            gui.messages.push(new Message(error));
            this.history.add(gui);
            this.history.done();
          });
        }
        return Promise.resolve();
      }, Promise.resolve());
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get currentGui(): Gui {
    return this.history.currentGui;
  }

  validate(form: NgForm): Promise<boolean> {
    if (form.valid) {
      this.validation = this.forgeService.validate(this.command, this.history).then(gui => {
        this.currentGui.messages = gui.messages;
        this.currentGui.state = gui.state;
        this.validation = null;
        this.form.control.markAsPristine();
        return this.currentGui.messages.length === 0;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return this.validation;
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}