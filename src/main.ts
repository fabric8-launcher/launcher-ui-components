// The usual bootstrapping imports
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { StaticInjector } from "ngx-forge";

if (process.env.ENV === "production") {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(modRef => {
  StaticInjector.setInjector(modRef.injector);
});