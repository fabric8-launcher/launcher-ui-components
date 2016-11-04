import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/step1',
    pathMatch: 'full'
  },
  {
    path: 'step1',
    component: Step1Component
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}