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

  modelChanged() {
    this.validate.emit();
    let gitHubRepositoryName = this.getField("gitHubRepositoryName");
    if (!gitHubRepositoryName.value || gitHubRepositoryName.value.length === 0) {
      gitHubRepositoryName.value = this.getField("named").value;
    }
  }

}

