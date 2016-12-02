import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './wizard/wizard.component';
import { IntroComponent } from './wizard/intro/intro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: 'wizard',
    component: FormComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}