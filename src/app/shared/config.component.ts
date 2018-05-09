import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {Config} from "ngx-forge";

declare var settings: object;

@Injectable()
export class LaunchConfig extends Config {
  protected readonly settings = {
    origin: 'launcher',
    backend_url:  process.env.LAUNCHER_BACKEND_URL,
    mission_control_url: process.env.LAUNCHER_MISSIONCONTROL_URL,
    keycloak_url: process.env.LAUNCHER_KEYCLOAK_URL,
    keycloak_realm: process.env.LAUNCHER_KEYCLOAK_REALM,
    keycloak_client_id: process.env.LAUNCHER_KEYCLOAK_CLIENT_ID
  };

  constructor() {
    super();
    this.processInitConfig();
    this.postProcessSettings();
    console.info("LaunchConfig is: " + JSON.stringify(this.settings));
  }

  private processInitConfig() {
    if (settings) {
      Object.assign(this.settings, settings);
    }
  }

  private postProcessSettings() {
    const backend_url = Location.stripTrailingSlash(this.settings['backend_url']);
    this.settings['backend_api_url'] = backend_url;
    this.settings['backend_url'] = backend_url + '/launchpad';

    let missionControl = this.settings['mission_control_url'];
    if (missionControl && (missionControl.startsWith("/") || missionControl.startsWith(":"))) {
      missionControl = (missionControl.startsWith(":") ? location.hostname : location.host) + missionControl;
      this.settings['mission_control_url'] = (location.protocol === "https:" ? "wss://" : "ws://") + missionControl;
    }
  }

  get(key: string): string {
    return this.settings[key];
  }
}
