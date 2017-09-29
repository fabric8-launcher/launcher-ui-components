import { Component, forwardRef, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

import { InputComponent } from "../input/input.component";
import { Input } from "../../../shared/model";
import { KeycloakService } from "../../../shared/keycloak.service";
import { SuggestFilterPipe } from "./filter.pipe";

@Component({
  selector: "la-project-name-input",
  templateUrl: "project-name-input.component.html",
  styleUrls: ["../input/input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectNameInputComponent),
      multi: true
    }
  ]
})
export class ProjectNameInputComponent extends InputComponent {
  projectName: string = "";
  prefix: string;
  constructor(private keycloak: KeycloakService) {
    super();
    this.resetPrefix();
    this.keyUp.subscribe(_ => {
      this.input.value = this.createPrefix() + '-' + this.projectName;
      this.resetPrefix();
    });
  }

  private resetPrefix() {
    this.prefix = this.createPrefix() + ' -';
  }

  private createPrefix() {
    let username = this.keycloak.username();
    if (username.indexOf('@') !== -1) {
      username = username.substr(0, username.indexOf('@'));
    }
    return username.replace(/[^a-zA-Z0-9]|\./g, '-');
}

  setValue(value: string) {
    this.input.value = value;
    this.projectName = value;
    this.prefix = "";
    this.onModelChange(value);
  }

  writeValue(obj: Input): void {
    if (obj && obj.value) {
      this.input.value = this.projectName + obj.value;
    }
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ProjectNameInputComponent, SuggestFilterPipe],
  declarations: [ProjectNameInputComponent, SuggestFilterPipe],
})
export class ProjectNameInputModule {
}


