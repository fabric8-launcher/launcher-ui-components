import {Config, HelperService} from "ngx-forge";

export class LaunchHelper extends HelperService {
  private readonly launchConfig: Config;

  constructor(config: Config) {
    super(config);
    this.launchConfig = config;
  }

  getBackendUrl(): string {
    return this.launchConfig.get('backend_api_url');
  }

  getOrigin(): string {
    return this.launchConfig.get('origin');
  }
}