import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from './wizzard.component';

import { ForgeService } from './list.service'

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
export class WizzardModule { }