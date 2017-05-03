import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IntroComponent } from './intro/intro.component';
import { FormComponent } from './wizard.component';
import { DeployComponent } from './deploy/deploy.component';
import { ForgeService } from '../shared/forge.service';
import { Config } from '../shared/config.component';

import { KeycloakService } from '../shared/keycloak.service';
import { KEYCLOAK_HTTP_PROVIDER } from '../shared/keycloak.http';

import { MultiselectListModule } from '../shared/multiselect-list';
import { ProjectSelectModule } from '../shared/project-select';
import { StepComponent } from "./step.component";
import { InputComponent } from "./input.component";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectListModule,
    ProjectSelectModule,
    MultiselectDropdownModule
  ],
  declarations: [
    IntroComponent,
    FormComponent,
    DeployComponent,
    StepComponent,
    InputComponent
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER,
    ForgeService,
    Config,
    { provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true }
  ]
})
export class WizardModule { }