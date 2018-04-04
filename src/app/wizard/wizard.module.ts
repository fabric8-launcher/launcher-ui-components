import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule, APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Config, ForgeService, History, NgxForgeModule, TokenProvider, MissionRuntimeService, HelperService, DependencyCheckService, GitProviderService, PipelineService, ProjectProgressService, ProjectSummaryService, TargetEnvironmentService, AuthHelperService } from "ngx-forge";

import { KeycloakService } from "../shared/keycloak.service";
import { KeycloakTokenProvider } from "../shared/keycloak-token.provider";
import { TokenService } from "../shared/token.service";

import { FormComponent } from "./wizard.component";
import { EnhancedForgeService } from "../shared/forge.enhance.service";
import { LaunchConfig } from "../shared/config.component";
import { StepComponent } from "./components/step/step.component";
import { ButtonComponent } from "./components/button/button.component";
import { AsciidocComponent } from "./components/asciidoc/asciidoc.component";
import { AsciidocService } from "./components/asciidoc/asciidoc.service";
import { ProjectNameInputModule } from "./components/project-name-input/project-name-input.component";

import { IntroComponent } from "./pages/intro/intro.component";
import { LinkAccountsPage } from "./pages/linkAccounts/link-accounts.page";
import { DeploymentTypePage } from "./pages/deployment/deployment.page";
import { MissionPage } from "./pages/mission/mission.page";
import { RuntimePage } from "./pages/runtime/runtime.page";
import { ProjectInfoPage } from "./pages/projectInfo/projectInfo.page";
import { DeployPage } from "./pages/deploy/deploy.page";
import { NextStepsPage } from "./pages/nextSteps/nextSteps.page";
import { GenericPage } from "./pages/generic/generic.page";

import { AuthAPIProvider } from './services/app-launcher-authprovider.service';
import { AppLauncherGitproviderService } from './services/app-launcher-gitprovider.service';
import { AppLauncherMissionRuntimeService } from './services/app-launcher-mission-runtime.service';
import { AppLauncherPipelineService } from './services/app-launcher-pipeline.service';
import { AppLauncherProjectProgressService } from './services/app-launcher-project-progress.service';
import { AppLauncherProjectSummaryService } from './services/app-launcher-project-summary.service';
import { AppLauncherTargetEnvironmentService } from './services/app-launcher-target-environment.service';
import { AppLauncherDependencyCheckService } from "./services/app-launcher-dependency-check.service";

import { AuthenticationDirective } from "../shared/authentication.directive";
import { CiDirective } from "../shared/ci.directive";

import { ModalModule } from "ngx-modal";

import { LauncherModule } from "ngx-forge";
import { AsciidocIndex } from "./components/asciidoc/asciidoc.index";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectNameInputModule,
    NgxForgeModule,
    ModalModule,
    LauncherModule
  ],
  declarations: [
    AsciidocComponent,
    IntroComponent,
    FormComponent,
    IntroComponent,
    LinkAccountsPage,
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
    { provide: ForgeService, useClass: EnhancedForgeService },
    AsciidocService,
    AsciidocIndex,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloak: KeycloakService) => () => keycloak.init(),
      deps: [KeycloakService],
      multi: true
    },
    {
      provide: TokenProvider,
      useFactory: (keycloak: KeycloakService) => new KeycloakTokenProvider(keycloak),
      deps: [KeycloakService]
    },
    TokenService,
    History,
    LaunchConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: LaunchConfig) => () => config.load(),
      deps: [LaunchConfig],
      multi: true
    },
    {
      provide: Config,
      useClass: LaunchConfig
    },
    {
      provide: HelperService, useFactory: (config: LaunchConfig) => new (class MyRunnable extends HelperService {
        getBackendUrl(): string {
          let url = super.getBackendUrl();
          return url.substr(0, url.indexOf('launchpad'));
        }
      })(config),
      deps: [LaunchConfig],
      multi: true
    },
    { provide: GitProviderService, useClass: AppLauncherGitproviderService },
    { provide: MissionRuntimeService, useClass: AppLauncherMissionRuntimeService },
    { provide: PipelineService, useClass: AppLauncherPipelineService },
    { provide: ProjectProgressService, useClass: AppLauncherProjectProgressService },
    { provide: ProjectSummaryService, useClass: AppLauncherProjectSummaryService },
    { provide: TargetEnvironmentService, useClass: AppLauncherTargetEnvironmentService },
    { provide: DependencyCheckService, useClass: AppLauncherDependencyCheckService },
    {
      provide: AuthHelperService,
      useFactory: (keycloak: KeycloakService) => keycloak.getToken().then(token => new AuthAPIProvider(token)),
      deps: [KeycloakService]
    }
  ]
})
export class WizardModule {
}