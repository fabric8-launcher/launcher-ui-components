import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './wizzard/wizzard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wizzard',
    pathMatch: 'full'
  },
  {
    path: 'wizzard',
    component: Step1Component
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}