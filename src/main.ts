import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';

import { AppModule } from './app/app.module';
import { StaticInjector } from 'ngx-forge';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((modRef) => {
      StaticInjector.setInjector(modRef.injector);
      environment.decorateModuleRef(modRef);
    })
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
