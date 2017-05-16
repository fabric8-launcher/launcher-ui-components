import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from './wizard.component';
import { History } from './history.component';
import { ForgeService } from '../shared/forge.service';
import { Config } from '../shared/config.component';

import { IntroComponent } from './pages/intro/intro.component';
import { DeploymentTypePage } from './pages/deployment/deployment.page';
import { MissionPage } from './pages/mission/mission.page';
import { RuntimePage } from './pages/runtime/runtime.page';
import { MetadataPage } from './pages/metadata/metadata.page';
import { DeployPage } from './pages/deploy/deploy.page';
import { GenericPage } from './pages/generic/generic.page';

import { KeycloakService } from '../shared/keycloak.service';
import { KEYCLOAK_HTTP_PROVIDER } from '../shared/keycloak.http';

import { ProjectSelectModule } from './components/project-select/project-select';
import { StepComponent } from "./components/step/step.component";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {AuthenticationDirective} from "../shared/authentication.directive";
import {CiDirective} from "../shared/ci.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectSelectModule,
    MultiselectDropdownModule
  ],
  declarations: [
    FormComponent,
    IntroComponent,
    DeploymentTypePage,
    MissionPage,
    RuntimePage,
    MetadataPage,
    DeployPage,
    GenericPage,
    StepComponent,
    InputComponent,
    ButtonComponent,
    AuthenticationDirective,
    CiDirective
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER,
    ForgeService,
    History,
    Config,
    { provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true }
  ]
})
export class WizardModule { }