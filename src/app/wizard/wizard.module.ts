import {APP_INITIALIZER, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {FormComponent} from "./wizard.component";
import {History} from "./history.component";
import {ForgeService} from "../shared/forge.service";
import {Config} from "../shared/config.component";
import {AsciidocService} from "./components/asciidoc/asciidoc.service";

import {IntroComponent} from "./pages/intro/intro.component";
import {DeploymentTypePage} from "./pages/deployment/deployment.page";
import {MissionPage} from "./pages/mission/mission.page";
import {RuntimePage} from "./pages/runtime/runtime.page";
import {ProjectInfoPage} from "./pages/projectInfo/projectInfo.page";
import {DeployPage} from "./pages/deploy/deploy.page";
import {NextStepsPage} from "./pages/nextSteps/nextSteps.page";
import {GenericPage} from "./pages/generic/generic.page";

import {LoginService} from "../shared/login.service";

import {ProjectSelectModule} from "./components/project-select/project-select";
import {StepComponent} from "./components/step/step.component";
import {InputComponent} from "./components/input/input.component";
import {ButtonComponent} from "./components/button/button.component";
import {AsciidocComponent} from "./components/asciidoc/asciidoc.component";
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect/src/multiselect-dropdown";
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
    ProjectInfoPage,
    NextStepsPage,
    DeployPage,
    GenericPage,
    StepComponent,
    InputComponent,
    ButtonComponent,
    AsciidocComponent,
    AuthenticationDirective,
    CiDirective
  ],
  providers: [
    LoginService,
    ForgeService,
    History,
    Config,
    AsciidocService,
    {provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true}
  ]
})
export class WizardModule {
}