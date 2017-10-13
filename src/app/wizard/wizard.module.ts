import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {FormComponent} from "./wizard.component";
import {AsciidocIndex, Config, ForgeService, History, NgxForgeModule} from "ngx-forge";
import {EnhancedForgeService} from "../shared/forge.enhance.service";
import {LaunchConfig} from "../shared/config.component";

import {IntroComponent} from "./pages/intro/intro.component";
import {DeploymentTypePage} from "./pages/deployment/deployment.page";
import {MissionPage} from "./pages/mission/mission.page";
import {RuntimePage} from "./pages/runtime/runtime.page";
import {ProjectInfoPage} from "./pages/projectInfo/projectInfo.page";
import {DeployPage} from "./pages/deploy/deploy.page";
import {NextStepsPage} from "./pages/nextSteps/nextSteps.page";
import {GenericPage} from "./pages/generic/generic.page";

import {KeycloakService} from "../shared/keycloak.service";
import {KEYCLOAK_HTTP_PROVIDER} from "../shared/keycloak.http";

import {StepComponent} from "./components/step/step.component";
import {ProjectNameInputModule} from "./components/project-name-input/project-name-input.component";
import {ButtonComponent} from "./components/button/button.component";
import {AuthenticationDirective} from "../shared/authentication.directive";
import {CiDirective} from "../shared/ci.directive";
import {LaunchAdocIndex} from "../shared/asciidoc.index";

export function config(http: Http) {
  let config = new LaunchConfig(http);
  config.load();
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectNameInputModule,
    NgxForgeModule
  ],
  declarations: [
    FormComponent,
    IntroComponent,
    DeploymentTypePage,
    MissionPage,
    RuntimePage,
    ProjectInfoPage,
    NextStepsPage,
    DeployPage,
    GenericPage,
    StepComponent,
    ButtonComponent,
    AuthenticationDirective,
    CiDirective
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER,
    History,
    {
      provide: AsciidocIndex,
      useFactory: function create() {
        return new LaunchAdocIndex();
      }
    },
    {
      provide: Config,
      useFactory: config,
      deps: [Http]
    },
    {
      provide: ForgeService,
      useClass: EnhancedForgeService
    }
  ]
})
export class WizardModule {
}