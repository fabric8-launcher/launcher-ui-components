import { ErrorHandler } from "@angular/core";
import * as Raven from 'raven-js';
import {Config} from "ngx-forge";

class RavenErrorHandler extends ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError || err);
    super.handleError(err);
  }
}

export function errorHandlerFactory(config: Config) {
  const sentryDsn = config.get('sentry_dsn');
  if (sentryDsn) {
    const config = {
      environment: process.env.ENV
    };
    console.info('Starting Error Handler with Sentry DSN: ' + sentryDsn);
    Raven.config(sentryDsn, config).install();
    return new RavenErrorHandler();
  }
  console.info('Starting Default Error Handler');
  return new ErrorHandler();
}
