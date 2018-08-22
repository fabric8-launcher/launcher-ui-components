import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Logger } from './shared/logger.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WizardModule } from './wizard/wizard.module';
import { Broadcaster } from 'ngx-base';
import { Config } from 'ngx-launcher';
import { LaunchConfig } from './shared/config.component';
import { KeycloakService } from './shared/keycloak.service';
import { KeycloakServiceImpl } from './shared/keycloak.service.impl';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    Logger,
    { provide: Config, useClass: LaunchConfig },
    { provide: KeycloakService, useClass: KeycloakServiceImpl, deps: [Config] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
