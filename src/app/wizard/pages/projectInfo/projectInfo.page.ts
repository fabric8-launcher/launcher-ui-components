import { Component, Input } from "@angular/core";
import { GenericPage } from "../generic/generic.page";
import { SubmittableInput } from "../../../shared/model";
import {KeycloakService} from "../../../shared/keycloak.service";

@Component({
  selector: "projectInfo",
  templateUrl: "projectInfo.page.html"
})
export class ProjectInfoPage extends GenericPage {
  expand: boolean;

  constructor(private keycloak: KeycloakService) {
    super();
  }

  toggle() {
    this.expand = !this.expand;
  }

  getField(fieldName: string): SubmittableInput {
    return this.gui.inputs.find(i => i.name === fieldName);
  }

  modelChanged(value: any) {
    this.validate.emit();
    let named = this.getField("named");
    if (named.value && named.value.indexOf(this.keycloak.username()) === -1) {
      named.value = this.keycloak.username() + '-' + named.value;
    }
    if (value) {
      let gitHubRepositoryName = this.getField("gitHubRepositoryName");
      gitHubRepositoryName.value = value;
    }
  }

}

