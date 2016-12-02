import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IntroComponent } from './intro/intro.component';
import { FormComponent } from './wizard.component';
import { ForgeService } from './forge.service'

import { MultiselectDropdownModule } from '../shared/multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectDropdownModule
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