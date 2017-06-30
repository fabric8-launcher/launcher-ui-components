import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ForgeService} from "../shared/forge.service";
import {Gui, Input, Message, MetaData} from "../shared/model";
import {History} from "./history.component";
import {KeycloakService} from "../shared/keycloak.service";

let adocIndex = require("../../assets/adoc.index");

@Component({
  selector: "wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"]
})
export class FormComponent implements OnInit {
  @ViewChild("wizard") form: NgForm;
  command: string;
  validation: Promise<boolean>;

  constructor(private route: ActivatedRoute,
              private history: History,
              private forgeService: ForgeService,
              private keycloak: KeycloakService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let state = params["state"];
      this.command = params["command"];
      let stepIndex = +params["step"];

      this.history.resetTo(stepIndex);

      new Array(stepIndex + 1).fill(1).map((_, i) => i + 1).reduce((p, index) => {
        if (stepIndex + 1 === index || index >= 5) {
          return p.then(() => {
            let steps = this.history.get(1).state.steps;
            if (!this.history.get(steps.length - 1) && stepIndex >= steps.length - 1) {
              this.addDynamicGui("Review Summary", steps);
            }
            if (!this.history.get(steps.length) && stepIndex === steps.length) {
              this.addDynamicGui("Next Steps", steps);
            }

            this.history.done();
          });
        }
        if (!this.history.get(index)) {
          return p.then(() => this.forgeService.loadGui(this.command, this.history)).then((gui: Gui) => {
            this.history.add(gui);
            this.enhanceGui(gui);
            this.history.apply(state);
          });
        }
        return Promise.resolve();
      }, Promise.resolve());
    });
  }

  private addDynamicGui(name: string, steps: string[]) {
    let gui = new Gui();
    gui.metadata = {name: name} as MetaData;
    gui.state.steps = steps;
    gui.inputs = [];
    this.history.add(gui);
  }

  private enhanceGui(gui: Gui) {
    gui.metadata.intro = adocIndex[gui.state.steps[gui.stepIndex - 1] + "-intro"];
    gui.state.steps.push("Review");
    gui.state.steps.push("Next Steps");
    if (gui.inputs) {
      gui.inputs.forEach(submittableInput => {
        let input = submittableInput as Input;
        if (input.valueChoices) {
          input.valueChoices.forEach(choice => {
            choice.description = adocIndex[input.name + choice.id];
          });
        }
      });
    }
  }

  get currentGui(): Gui {
    return this.history.currentGui;
  }

  validate(form: NgForm): Promise<boolean> {
    if (form.valid) {
      this.validation = this.forgeService.validate(this.command, this.history).then(gui => {
        this.currentGui.messages = gui.messages;
        this.currentGui.state = gui.state;
        this.enhanceGui(this.currentGui);
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