import { Injectable } from "@angular/core";
import { Config } from "ngx-forge";

@Injectable()
export class LaunchConfig extends Config {

  load(): Promise<Config> {
    let settings = {};

    const apiUrl: string = process.env.LAUNCHPAD_BACKEND_URL;
    if (apiUrl) {
      settings['backend_url'] = apiUrl;
    }

    if (settings['backend_url'] && settings['backend_url'][settings['backend_url'].length - 1] !== '/') {
      settings['backend_url'] += '/';
    }
    settings['backend_url'] += 'launchpad';

    this.set(settings);
    return super.load().then(() => this);
  }
}