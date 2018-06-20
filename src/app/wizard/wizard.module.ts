import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AuthHelperService,
  Config,
  DependencyCheckService,
  GitProviderService,
  HelperService,
  LauncherModule,
  MissionRuntimeService,
  PipelineService,
  ProjectProgressService,
  ProjectSummaryService,
  TargetEnvironmentService,
  TokenProvider,
  TokenService
} from 'ngx-forge';

import { KeycloakService } from '../shared/keycloak.service';
import { KeycloakTokenProvider } from '../shared/keycloak-token.provider';
import { AuthGuardService } from '../shared/authguard.service';

import { PopoverModule } from 'ngx-bootstrap/popover';

import { WizardComponent } from './wizard.component';
import { LaunchConfig } from '../shared/config.component';

import { IntroComponent } from './pages/intro/intro.component';

import { AuthAPIProvider } from './services/app-launcher-authprovider.service';
import { AppLauncherGitproviderService } from './services/app-launcher-gitprovider.service';
import { AppLauncherMissionRuntimeService } from './services/app-launcher-mission-runtime.service';
import { AppLauncherPipelineService } from './services/app-launcher-pipeline.service';
import { AppLauncherProjectProgressService } from './services/app-launcher-project-progress.service';
import { AppLauncherProjectSummaryService } from './services/app-launcher-project-summary.service';
import { AppLauncherTargetEnvironmentService } from './services/app-launcher-target-environment.service';
import { AppLauncherDependencyCheckService } from './services/app-launcher-dependency-check.service';
import { AppLauncherTokenService } from './services/app-launcher-token.service';

import { AuthenticationDirective } from '../shared/authentication.directive';

import { ModalModule } from 'ngx-modal';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { LaunchHelper } from '../shared/helper.component';
import { errorHandlerFactory } from '../shared/error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    LauncherModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot()
  ],
  declarations: [
    GettingStartedComponent,
    WizardComponent,
    IntroComponent,
    AuthenticationDirective
  ],
  providers: [
    AuthGuardService,
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
    History,
    { provide: Config, useClass: LaunchConfig },
    { provide: ErrorHandler, useFactory: errorHandlerFactory, deps: [Config] },
    { provide: HelperService, useClass: LaunchHelper, deps: [Config] },
    { provide: GitProviderService, useClass: AppLauncherGitproviderService },
    { provide: MissionRuntimeService, useClass: AppLauncherMissionRuntimeService },
    { provide: PipelineService, useClass: AppLauncherPipelineService },
    { provide: ProjectProgressService, useClass: AppLauncherProjectProgressService },
    { provide: ProjectSummaryService, useClass: AppLauncherProjectSummaryService },
    { provide: TargetEnvironmentService, useClass: AppLauncherTargetEnvironmentService },
    { provide: DependencyCheckService, useClass: AppLauncherDependencyCheckService },
    {
      provide: AuthHelperService,
      useFactory: (keycloak: KeycloakService) => keycloak.getToken().then((token) => new AuthAPIProvider(token)),
      deps: [KeycloakService]
    },
    { provide: TokenService, useClass: AppLauncherTokenService }
  ]
})
export class WizardModule {
}
