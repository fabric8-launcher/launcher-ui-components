import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IntroComponent } from './intro/intro.component';
import { FormComponent } from './wizard.component';
import { ForgeService } from './forge.service'

import { MultiselectListModule } from '../shared/multiselect-list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectListModule
  ],
  declarations: [
    IntroComponent,
    FormComponent
  ],
  providers: [
      ForgeService
  ]
})
export class WizardModule { }