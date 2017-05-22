// The usual bootstrapping imports
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { KeycloakService } from "./app/shared/keycloak.service";

if (process.env.ENV === "production") {
  enableProdMode();
}

KeycloakService.init()
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule));