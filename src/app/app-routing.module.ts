import { NgModule }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./wizard/wizard.component";
import { IntroComponent } from "./wizard/pages/intro/intro.component";
import { WizardComponent } from "./wizard/new-wizard.component";
import { GettingStartedComponent } from "./wizard/pages/getting-started/getting-started.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-wizard",
    pathMatch: "full",
  },
  {
    /* keeping this in pace in case someone bookmarked the old rotues */
    path: "wizard",
    children: [
      {
        path: "",
        redirectTo: "/filtered-wizard/all",
        pathMatch: "full",
      },
      {
        path: ":command/:step",
        redirectTo: "/filtered-wizard/all/:command/:step",
        pathMatch: "full",
      },
      {
        path: ":command/:step/:state",
        redirectTo: "/filtered-wizard/all/:command/:step/:state",
        pathMatch: "full",
      }
    ]
  },
  {
    path: "filtered-wizard",
    children: [
      {
        path: ":filters",
        component: IntroComponent,
        data: {
          name: "intro"
        }
      },
      {
        path: ":filters/:command/:step",
        component: FormComponent,
        data: {
          name: "step"
        }
      },
      {
        path: ":filters/:command/:step/:state",
        component: FormComponent,
        data: {
          name: "step"
        }
      }
    ]
  },
  {
    path: 'new-wizard/:projectName',
    component: WizardComponent,
    pathMatch: 'full'
    
  },
  {
    path: "new-wizard",
    component: GettingStartedComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/new-wizard', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}