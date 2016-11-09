import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from './wizard.component';

import { ForgeService } from './forge.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FormComponent
  ],
  providers: [
      ForgeService
  ]
})
export class WizardModule { }