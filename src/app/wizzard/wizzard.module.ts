import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Step1Component } from './wizzard.component';
import { WizzardHeaderComponent } from './wizzard-title/wizzard-title.component';
import { WizzardSidebarComponent } from './wizzard-sidebar/wizzard-sidebar.component';

import { ListService } from './list.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Step1Component,
    WizzardHeaderComponent,
    WizzardSidebarComponent
  ],
  providers: [
      ListService
  ]
})
export class WizzardModule { }