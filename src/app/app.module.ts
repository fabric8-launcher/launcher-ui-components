import './rxjs-extensions';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-dropdown';

// Shared
import { Logger } from './shared/logger.service';

import { FormsModule } from '@angular/forms';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Footer
import { FooterComponent } from './footer/footer.component';

// Header
import { HeaderComponent } from './header/header.component';

import { WizardModule } from './wizard/wizard.module'

// conditionally import the inmemory resource module
var moduleImports: Array<any[] | any | ModuleWithProviders> = [
];


@NgModule({
  imports: [
    BrowserModule,
    DropdownModule,
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
