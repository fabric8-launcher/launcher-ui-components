
import { Injectable } from "@angular/core";
import { Gui, History, Input, Option } from "./model";
import { ForgeService } from "./forge.service";

@Injectable()
export class GuiService {
  private guis: Gui[] = [];
  private steps: string[] = ['Start', 'Minishift', 'Continues Deployment', 'Missions', 'Runtime', 'Review']

  constructor(private forgeService: ForgeService) {
  }

  get Start(): Gui {
    let gui = this.createGui();

    gui.inputs = [{
      label: "Local or Hosted", name: "localOrHosted", class: "UISelectOne", valueChoices:
      [{ id: "Hosted" }, { id: "Local developement" }]
    } as Input]

    return gui;
  }

  get Minishift(): Gui {
    let gui = this.createGui();
    gui.inputs = [{
      label: "Minishift or CDK", name: "minishiftOrCDK", class: "UISelectOne", valueChoices:
        [{ id: "Minishift" }, { id: "CDK" }]
    } as Input];
    return gui;
  }

  get 'Continues Deployment'(): Gui {
    let gui = this.createGui();
    gui.inputs = [{
      label: "Zip or Continues Deployment", name: "zipOrCD", class: "UISelectOne", valueChoices:
        [{ id: "Continues Deployment" }, { id: "Zip" }]
    } as Input];
    return gui;
  }

  get Missions(): Gui {
    let gui = this.createGui();
    gui.inputs = [{
      label: "Select your mission", name: "mission", class: "UISelectOne", valueChoices:
        [{ id: "configmap" }, { id: "rest-http" }, {id: "health-check"}]
    } as Input];
    return gui;
  }

  get Runtime(): Gui {
    let gui = this.createGui();
    gui.inputs = [{
      label: "Select your runtime", name: "runtime", valueType: 'org.jboss.forge.addon.projects.ProjectType', class: "UISelectOne", valueChoices:
        [{ id: "Vert.x" }, { id: "WildFly Swarm" }, {id: "Spring Boot"}]
    } as Input];
    return gui;
  }

  get Review(): Gui {
    let gui = new Gui();
    gui.inputs = [];
    gui.results = [];

    return gui;
  }

  getGui(index: number): Gui {
    let page = this.steps[index];
    return this[page];
  }

  validate(index: number, gui: Gui): Promise<Gui> {
    if (true) {
      gui.state.canMoveToNextStep = true;
    }
    if (index != 0) {
      gui.state.canMoveToPreviousStep = true;
    }
    return Promise.resolve(gui);
  }

  createGui(): Gui {
    let gui = new Gui();
    gui.state.steps = this.steps;

    return gui;
  }
}