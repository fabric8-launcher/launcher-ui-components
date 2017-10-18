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
      const apiUrl: string = process.env.LAUNCHPAD_BACKEND_URL;
      if (apiUrl) {
        LaunchConfig.settings['backend_url'] = apiUrl;
      }

      LaunchConfig.settings['backend_url'] = Location.stripTrailingSlash(LaunchConfig.settings['backend_url'])
        + '/launchpad';
    });
  }

  get(key: string): string {
    return LaunchConfig.settings[key];
  }
}