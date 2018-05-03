import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { errorHandlerFactory } from "./shared/error.component";
import { Logger } from "./shared/logger.service";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
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
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    Logger,
    { provide: ErrorHandler, useFactory: errorHandlerFactory }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
