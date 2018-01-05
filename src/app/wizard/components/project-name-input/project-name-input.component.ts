import { Component, ElementRef, forwardRef, NgModule, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

import { InputComponent } from "ngx-forge";
import { Input } from "ngx-forge";
import { KeycloakService } from "../../../shared/keycloak.service";
import { SuggestFilterPipe } from "./filter.pipe";

@Component({
  selector: "la-project-name-input",
  templateUrl: "project-name-input.component.html",
  styleUrls: ["project-name-input.component.scss"],
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
  constructor(_renderer: Renderer2, _elementRef: ElementRef,
              private keycloak: KeycloakService) {
    super(_renderer, _elementRef, false);
    this.resetPrefix();
    this.keyUp.subscribe(() => {
      this.input.value = (this.createPrefix() ? this.createPrefix() + '-': '') + this.projectName;
      this.resetPrefix();
    });
  }

  private resetPrefix() {
    this.prefix = this.createPrefix() ? this.createPrefix() + ' -' : '';
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
    this.onChange(value);
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


