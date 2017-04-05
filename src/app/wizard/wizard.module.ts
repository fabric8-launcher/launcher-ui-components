import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IntroComponent } from './intro/intro.component';
import { VersionComponent } from './versions/versions.component';
import { FormComponent } from './wizard.component';
import { DeployComponent } from './deploy/deploy.component';
import { ForgeService } from '../shared/forge.service';
import { Config } from '../shared/config.component';

import { KeycloakService } from '../shared/keycloak.service';
import { KEYCLOAK_HTTP_PROVIDER } from '../shared/keycloak.http';

import { MultiselectListModule } from '../shared/multiselect-list';
import { ProjectSelectModule } from '../shared/project-select';
import { AsciidocRenderer } from "../asciidoc/asciidoc.component";
import { CompileHtmlService } from "p3x-angular-compile-html";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectListModule,
    ProjectSelectModule
  ],
  declarations: [
    IntroComponent,
    VersionComponent,
    FormComponent,
    DeployComponent,
    AsciidocRenderer
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER,
    ForgeService,
    CompileHtmlService,
    Config,
    { provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true }
  ]
})
export class WizardModule { }