/* tslint:disable */

import { ApplicationRef, NgModuleRef } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';

Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;
let env: Environment;
if ( process.env.ENV === 'production') {
  env = {
    production: true,
    showDevModule: false,

    /** Angular debug tools in the dev console
     * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
     * @param modRef
     * @return {any}
     */
    decorateModuleRef(modRef: NgModuleRef<any>) {
      disableDebugTools();
      return modRef;
    },
    ENV_PROVIDERS: []
  };
} else {
  env = {
    production: false,
    showDevModule: true,

    /** Angular debug tools in the dev console
     * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
     * @param modRef
     * @return {any}
     */
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

