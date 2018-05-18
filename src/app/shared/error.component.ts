import { ErrorHandler } from "@angular/core";
import { Config } from "ngx-forge";
import * as Raven from 'raven-js';

class RavenErrorHandler extends ErrorHandler {
  handleError(err: any): void {
    if (err) {
      Raven.captureException(err.originalError || err);
    }
    super.handleError(err);
  }
}

export function errorHandlerFactory(config: Config) {
  var sentryDsn = config.get('sentry_dsn');
  if (sentryDsn) {
    const sentryURL = new URL(sentryDsn);
    const config = {
      environment: sentryURL.searchParams.get('environment') || process.env.ENV
    };
    // Remove all query parameters
    var paramIdx = sentryDsn.indexOf('?');
    if (paramIdx > -1)  {
      sentryDsn = sentryDsn.substring(0, paramIdx);
    }
    console.info('Starting Error Handler with Sentry DSN: ' + sentryDsn);
    Raven.config(sentryDsn, config).install();
    return new RavenErrorHandler();
  }
  console.info('Starting Default Error Handler');
  return new ErrorHandler();
}
