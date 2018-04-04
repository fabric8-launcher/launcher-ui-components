import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Config } from "ngx-forge";
import { Http } from "@angular/http";

@Injectable()
export class LaunchConfig extends Config {
  static settings = {};

  constructor(private http: Http) {
    super();
  }

  load(): Promise<any> {
    return this.http.get('settings.json').toPromise().then((settings) => {
      LaunchConfig.settings = Object.assign(LaunchConfig.settings, settings.json());
    }).catch(() => {
      console.info('settings.json not found ignoring');
    }).then(() => {
      let backendUrl = LaunchConfig.settings['backend_url'];
      if (!backendUrl) {
        backendUrl = process.env.LAUNCHER_BACKEND_URL;
      }

      LaunchConfig.settings['backend_url'] = Location.stripTrailingSlash(backendUrl) + '/launchpad';
      LaunchConfig.settings['origin'] = 'launcher';

      let missionControl = LaunchConfig.settings['mission_control_url'];
      if (!missionControl) {
        missionControl = process.env.LAUNCHER_MISSIONCONTROL_URL;
      }

      if (missionControl && (missionControl.startsWith("/") || missionControl.startsWith(":"))) {
        missionControl = (missionControl.startsWith(":") ? location.hostname : location.host) + missionControl;
        missionControl = (location.protocol === "https:" ? "wss://" : "ws://") + missionControl;
      }

      LaunchConfig.settings['mission_control_url'] = missionControl;
    });
  }

  get(key: string): string {
    return LaunchConfig.settings[key];
  }
}
