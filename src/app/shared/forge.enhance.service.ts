import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ForgeService } from "./forge.service";
import { History } from "../wizard/history.component";
import { Gui, MetaData, Input } from "./model";
import { AsciidocService } from "../wizard/components/asciidoc/asciidoc.service";
import { Config } from "./config.component";

@Injectable()
export class EnhancedForgeService extends ForgeService {
  private steps: string[];

  constructor(protected http: Http, protected config: Config, private asciidoc: AsciidocService) {
    super(http, config);
  }

  commandInfo(command: string): Promise<Gui> {
    return this.enhanceGui(super.commandInfo(command).then(gui => {
      this.steps = gui.state.steps.slice(0);
      return gui;
    }), 1);
  }

  nextStep(command: string, history: History): Promise<Gui> {
    let gui: Promise<Gui>;
    if (history.stepIndex == this.steps.length) {
      gui = this.addDynamicGui("Review Summary", [{name: "GITHUB_CREATE"} as Input, {name: "OPENSHIFT_CREATE"} as Input]);
    } else if (history.stepIndex == this.steps.length + 1) {
      gui = this.addDynamicGui("Next Steps");
    } else {
      gui = super.nextStep(command, history);
    }
    return this.enhanceGui(gui, history.stepIndex);
  }

  validate(command: string, history: History): Promise<Gui> {
    return this.enhanceGui(super.validate(command, history), history.stepIndex);
  }

  private addDynamicGui(name: string, inputs?: Input[]): Promise<Gui> {
    let gui = new Gui();
    gui.metadata = {name: name} as MetaData;
    gui.state.steps = this.steps.slice(0);
    gui.inputs = inputs || [];
    return Promise.resolve(gui);
  }

  private enhanceGui(gui: Promise<Gui>, stepIndex: number): Promise<Gui> {
    return gui.then(gui => {
      if (gui.metadata) {
        gui.metadata.intro = this.asciidoc.generateHtml(gui.state.steps[stepIndex] + "-intro");
      }
      gui.state.steps.push("Review");
      gui.state.steps.push("Next Steps");
      if (gui.inputs) {
        gui.inputs.forEach(submittableInput => {
          let input = submittableInput as Input;
          if (input.valueChoices) {
            input.valueChoices.forEach(choice => {
              choice.description = this.asciidoc.generateHtml(input.name + choice.key);
            });
          }
        });
      }
      return gui;
    });
  }

}
