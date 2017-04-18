
import { Injectable } from "@angular/core";
import { Gui, History, Input, Option, SubmittableInput, MetaData } from "./model";
import { ForgeService } from "./forge.service";

var adocIndex = require('../../assets/adoc.index');

@Injectable()
export class GuiService {
  private command = "launchpad-new-project";
  private gui: Gui;
  private missions: SubmittableInput;
  private steps: string[] = ['Continues Deployment', 'Missions', 'Runtime', 'Review']

  constructor(private forgeService: ForgeService) {
    forgeService.commandInfo(this.command).then(gui => {
      this.gui = gui;
      gui.state.steps = this.steps;
      for (let index in this.gui.inputs) {
        let input = this.gui.inputs[index];
        if (input.name == "mission") {
          this.missions = input;
          this.gui.inputs.splice(+index, 1);
        }
      }
    });
  }

  get 'Continues Deployment'(): Gui {
    let gui = this.createGui();
    gui.metadata = {intro: adocIndex["launchpad-launch-mission"]} as MetaData;
    gui.inputs = [{
      label: "Zip or Continues Deployment", name: "zipOrCD", class: "UISelectOne", valueChoices:
        [{ id: "Continues Deployment" }, { id: "Zip" }], value: "Continues Deployment"
    } as Input];
    return gui;
  }

  get Missions(): Gui {
    let gui = this.createGui();
    gui.metadata = {intro: adocIndex["mission-intro"]} as MetaData;
    gui.inputs = [this.missions];
    return gui;
  }

  get Runtime(): Gui {
    this.gui.state.canMoveToNextStep = true;
    return this.gui;
  }

  get Review(): Gui {
    let gui = this.createGui();
    gui.state.steps = null;
    gui.inputs = [];
    gui.results = [];

    return gui;
  }

  getGui(index: number): Gui {
    let page = this.steps[index];
    return this[page];
  }

  validate(index: number, history: History): Promise<Gui> {
    const gui = history.currentGui();

    if (index != 0) {
      gui.state.canMoveToPreviousStep = true;
    }

    if (index == 2) {
      return this.forgeService.validate(this.command, history).then(gui => {
        gui.state.canMoveToNextStep = true;
        return gui;
      })
    }
    
    return Promise.resolve(gui);
  }

  createGui(): Gui {
    let gui = new Gui();
    gui.metadata = new MetaData();
    gui.state.steps = this.steps;
    gui.state.canMoveToNextStep = true;

    return gui;
  }
}