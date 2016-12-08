import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IntroComponent } from './intro/intro.component';
import { FormComponent } from './wizard.component';
import { ForgeService } from './forge.service';
import { Config } from './config.component';

import { MultiselectListModule } from '../shared/multiselect-list';
import { ProjectSelectModule } from '../shared/project-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectListModule,
    ProjectSelectModule
  ],
  declarations: [
    IntroComponent,
    FormComponent
  ],
  providers: [
    ForgeService,
    Config,
    { provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true }
  ]
})
export class WizardModule { }