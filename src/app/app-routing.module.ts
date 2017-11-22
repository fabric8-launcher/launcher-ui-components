import { NgModule }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./wizard/wizard.component";
import { IntroComponent } from "./wizard/pages/intro/intro.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "filtered-wizard/all",
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
        component: IntroComponent
      },
      {
        path: ":filters/:command/:step",
        component: FormComponent
      },
      {
        path: ":filters/:command/:step/:state",
        component: FormComponent
      }
    ]
  },
  { path: '**', redirectTo: '/filtered-wizard/all', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}