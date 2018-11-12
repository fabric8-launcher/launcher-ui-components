import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Config } from 'ngx-launcher';

declare var injectedSettings: object;

@Injectable()
export class LaunchConfig extends Config {
  protected readonly settings = {
    origin: 'launcher',
    commit_hash: process.env.LAUNCHER_FRONTEND_COMMITHASH,
    backend_url: process.env.LAUNCHER_BACKEND_URL,
    creator_url: process.env.LAUNCHER_CREATOR_URL,
    creator_enabled: process.env.LAUNCHER_CREATOR_ENABLED,
    keycloak_url: process.env.LAUNCHER_KEYCLOAK_URL,
    keycloak_realm: process.env.LAUNCHER_KEYCLOAK_REALM,
    keycloak_client_id: process.env.LAUNCHER_KEYCLOAK_CLIENT_ID,
    sentry_dsn: process.env.LAUNCHER_FRONTEND_SENTRY_DSN
  };

  constructor() {
    super();
    this.processInitConfig();
    this.postProcessSettings();
    console.info('LaunchConfig is: ' + JSON.stringify(this.settings));
  }

  public get(key: string): string {
    return this.settings[key];
  }

  private processInitConfig() {
    if (injectedSettings) {
      for (const property in injectedSettings) {
        if (injectedSettings.hasOwnProperty(property) && injectedSettings[property]) {
          this.settings[property] = injectedSettings[property];
        }
      }
    }
  }

  private postProcessSettings() {
    const backendApiUrl = Location.stripTrailingSlash(this.settings['backend_url']);

    if (!backendApiUrl) {
      throw new Error('Invalid backend_url: ' + backendApiUrl);
    }

    this.settings['backend_api_url'] = backendApiUrl;
    this.settings['backend_websocket_url'] = this.createBackendWebsocketUrl(backendApiUrl);

    // Used by old wizard
    this.settings['backend_url'] = backendApiUrl + '/launchpad';
  }

  private createBackendWebsocketUrl(backendApiUrl: string) {
    let url = backendApiUrl.substring(0, backendApiUrl.indexOf('/api'));
    if (url.indexOf('https') !== -1) {
      return url.replace('https', 'wss');
    } else if (url.indexOf('http') !== -1) {
      return url.replace('http', 'ws');
    } else if (url.startsWith('/') || url.startsWith(':')) {
      // /launch/api
      url = (url.startsWith(':') ? location.hostname : location.host) + url;
      return (location.protocol === 'https:' ? 'wss://' : 'ws://') + url;
    }
    throw new Error('Error while creating websocket url from backend url: ' + backendApiUrl);
  }
}
