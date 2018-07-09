import { ErrorHandler } from '@angular/core';
import { Config } from 'ngx-launcher';
import * as Raven from 'raven-js';

class RavenErrorHandler extends ErrorHandler {
  public handleError(err: any): void {
    const safeErr = err || new Error('Undefined error, this is a strange error to investigate!');
    if (safeErr) {
      Raven.captureException(safeErr['originalError'] || safeErr);
    }
    super.handleError(err);
  }
}

export function errorHandlerFactory(config: Config) {
  let sentryDsn = config.get('sentry_dsn');
  if (sentryDsn) {
    const sentryURL = new URL(sentryDsn);
    const conf = {
      environment: sentryURL.searchParams.get('environment') || process.env.ENV
    };
    // Remove all query parameters
    const paramIdx = sentryDsn.indexOf('?');
    if (paramIdx > -1) {
      sentryDsn = sentryDsn.substring(0, paramIdx);
    }
    console.info('Starting Error Handler with Sentry DSN: ' + sentryDsn);
    Raven.config(sentryDsn, conf).install();
    return new RavenErrorHandler();
  }
  console.info('Starting Default Error Handler');
  return new ErrorHandler();
}
