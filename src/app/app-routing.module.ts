import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './wizard/wizard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wizard',
    pathMatch: 'full'
  },
  {
    path: 'wizard',
    component: FormComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}