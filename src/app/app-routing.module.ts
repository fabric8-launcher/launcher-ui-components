import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './wizzard/wizzard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wizzard',
    pathMatch: 'full'
  },
  {
    path: 'wizzard',
    component: FormComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}