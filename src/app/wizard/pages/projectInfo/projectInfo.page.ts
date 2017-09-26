import { Component, Input } from "@angular/core";
import { GenericPage } from "../generic/generic.page";
import { SubmittableInput } from "../../../shared/model";

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
    this.validate.emit();
    if (value) {
      let gitHubRepositoryName = this.getField("gitHubRepositoryName");
      gitHubRepositoryName.value = value;
    }
  }

}

