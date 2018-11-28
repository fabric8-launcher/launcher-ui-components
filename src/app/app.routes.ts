import { Routes } from '@angular/router';
import { IntroComponent } from './wizard/pages/intro/intro.component';
import { WizardComponent } from './wizard/wizard.component';

export const routes: Routes = [
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
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
