import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environment';

import { AppModule } from './app/app.module';
import { StaticInjector } from 'ngx-launcher';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((modRef) => environment.decorateModuleRef(modRef))
    .then((modRef) => StaticInjector.setInjector(modRef.injector))
    .catch((err) => console.error(err));
}

switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
 document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
 main();
}
