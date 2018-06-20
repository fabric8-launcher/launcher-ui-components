import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './wizard/pages/intro/intro.component';
import { WizardComponent } from './wizard/wizard.component';
import { GettingStartedComponent } from './wizard/pages/getting-started/getting-started.component';
import { AuthGuardService as AuthGuard } from './shared/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    data: {
      name: 'intro'
    },
    pathMatch: 'full',
  },
  {
    path: 'wizard/:projectName',
    component: WizardComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'wizard',
    component: GettingStartedComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
