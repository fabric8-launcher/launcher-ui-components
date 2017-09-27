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
    this.createPrefix();
    this.keyUp.subscribe(_ => {
      this.input.value = this.keycloak.username() + '-' + this.projectName;
      this.createPrefix();
    });
  }

  private createPrefix() {
    this.prefix = this.keycloak.username() + ' -';
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


