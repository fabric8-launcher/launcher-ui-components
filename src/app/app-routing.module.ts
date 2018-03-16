import { NgModule }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./wizard/wizard.component";
import { IntroComponent } from "./wizard/pages/intro/intro.component";

const routes: Routes = [
  {
    path: "",
    component: IntroComponent
  },
  {
    path: "wizard",
    component: FormComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}