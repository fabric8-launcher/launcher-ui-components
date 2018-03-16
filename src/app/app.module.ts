import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { Logger } from "./shared/logger.service";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { WizardModule } from "./wizard/wizard.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    WizardModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Logger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
