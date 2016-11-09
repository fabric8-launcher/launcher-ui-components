import './rxjs-extensions';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-dropdown';

// Imports for loading & configuring the in-memory web api
// if not used will be removed for production by treeshaking
import { InMemoryDataService } from './in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';

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
  BrowserModule,
  DropdownModule,
  FormsModule,
  HttpModule,
  AppRoutingModule,
  WizardModule
];

// The inmemory environment variable is checked and if present then the in-memory dataset is added.
if (process.env.ENV == 'inmemory') {
  moduleImports.push(InMemoryWebApiModule.forRoot(InMemoryDataService));
}

@NgModule({
  imports: moduleImports,
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
