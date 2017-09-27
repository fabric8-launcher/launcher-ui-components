import { Component, forwardRef, NgModule } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeycloakService } from "../../../shared/keycloak.service";
import { CommonModule } from "@angular/common";
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
  constructor(private keycloak: KeycloakService) {
    super();
    this.keyUp.subscribe(_ => {
      if (this.input.value && this.input.value.indexOf(this.keycloak.username()) === -1) {
        this.input.value = this.keycloak.username() + '-' + this.input.value;
      }
    });
  }

  setValue(value: string) {
    this.input.value = value;
    this.onModelChange();
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ProjectNameInputComponent, SuggestFilterPipe],
  declarations: [ProjectNameInputComponent, SuggestFilterPipe],
})
export class ProjectNameInputModule {
}


