/* tslint:disable */

import { ApplicationRef, enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';




// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;
let env: Environment;
if ( process.env.ENV === 'production') {
  enableProdMode();
  env = {
    production: true,
    showDevModule: false,

    decorateModuleRef(modRef: NgModuleRef<any>) {
      disableDebugTools();
      return modRef;
    },
    ENV_PROVIDERS: []
  };
} else {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  env = {
    production: false,
    showDevModule: true,
    decorateModuleRef(modRef: NgModuleRef<any>) {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  },
    ENV_PROVIDERS: []
  };
}

export const environment: Environment = env;

