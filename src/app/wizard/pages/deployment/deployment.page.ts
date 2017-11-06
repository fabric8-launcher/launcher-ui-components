import { Component, Input } from "@angular/core";
import { Gui, SubmittableInput } from "ngx-forge";

import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: "deployment",
  templateUrl: "deployment.page.html",
  styleUrls: ["deployment.page.scss"]
})
export class DeploymentTypePage extends ButtonComponent {
  @Input() gui: Gui;

  getField(fieldName: string): SubmittableInput {
    return this.gui.inputs.find(i => i.name === fieldName);
  }

  isZipFile(option : any) {
    return option.id == "ZIP File";
  }

}

