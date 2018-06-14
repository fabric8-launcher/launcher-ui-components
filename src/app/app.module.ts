import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { Broadcaster } from 'ngx-base';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { Logger } from "./shared/logger.service";
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
    Broadcaster,
    Logger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
