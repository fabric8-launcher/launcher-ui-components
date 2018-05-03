import { ErrorHandler, Injectable } from "@angular/core";
import * as Raven from 'raven-js';

let ravenEnabled = false;
if (process.env.LAUNCHER_SENTRY_DSN) {
  const config = {
    environment: process.env.ENV
  };
  Raven.config(process.env.LAUNCHER_SENTRY_DSN, config).install();
  ravenEnabled = true;
}

@Injectable()
class RavenErrorHandler extends ErrorHandler {
  handleError(err: any): void {
    if (!err) {
      err = new Error("Handling error without actual error, weird...");
    }
    Raven.captureException(err.originalError || err);
    super.handleError(err);
  }
}

export function errorHandlerFactory() {
  if (ravenEnabled) {
    return new RavenErrorHandler();
  } else {
    return new ErrorHandler();
  }
}

