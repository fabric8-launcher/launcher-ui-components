import { Config, HelperService } from 'ngx-launcher';

export class LaunchHelper extends HelperService {
  private readonly launchConfig: Config;

  constructor(config: Config) {
    super(config);
    this.launchConfig = config;
  }

  public getBackendUrl(): string {
    return this.launchConfig.get('backend_api_url');
  }

  public getOrigin(): string {
    return this.launchConfig.get('origin');
  }
}
