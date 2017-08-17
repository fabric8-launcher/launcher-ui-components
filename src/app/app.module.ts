import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { Logger } from "./shared/logger.service";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { WizardModule } from "./wizard/wizard.module";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    WizardModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    Logger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
