import { Component } from "@angular/core";
import { SubmittableInput } from "ngx-forge";

import { GenericPage } from "../generic/generic.page";

@Component({
  selector: "projectInfo",
  templateUrl: "projectInfo.page.html"
})
export class ProjectInfoPage extends GenericPage {
  expand: boolean;

  toggle() {
    this.expand = !this.expand;
  }

  getField(fieldName: string): SubmittableInput {
    return this.gui.inputs.find(i => i.name === fieldName);
  }

  modelChanged(value: any) {
    if (value) {
      let gitHubRepositoryName = this.getField("gitHubRepositoryName");
      gitHubRepositoryName.value = value;
    }
    this.validate.emit();
  }

}

