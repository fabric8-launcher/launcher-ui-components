import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Runtime, HelperService, TokenProvider } from 'ngx-launcher';
import { Capability, Property } from 'ngx-launcher';
import { AppCreatorService } from 'ngx-launcher';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppLauncherAppCreatorService extends HttpService implements AppCreatorService {
  // TODO make configurable
  private enums: any;

  constructor(
    _http: HttpClient,
    _helperService: HelperService,
    _tokenProvider: TokenProvider
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  public getFilteredCapabilities(): Observable<Capability[]> {
    return this.getCapabilities().pipe(map((capabilities) => this.filter(capabilities)));
  }

  public getCapabilities(): Observable<Capability[]> {
    return this.httpGet(AppLauncherAppCreatorService.API_URL, 'capabilities');
  }

  public getRuntimes(): Observable<Runtime[]> {
    return this.httpGet<any>(AppLauncherAppCreatorService.API_URL, 'enums').pipe(map((value) => {
      this.enums = value;
      return value.runtime;
    }));
  }

  private filter(capabilities: Capability[]): Capability[] {
    for (const capability of capabilities) {
      const props: Property[] = [];
      for (const prop of capability.props) {
        if (!prop.shared || prop.id === 'runtime') {
          prop.values = prop.id === 'runtime' ? prop.values : this.enums[prop.id];
          props.push(prop);
        }
      }
      capability.props = props;
    }
    return capabilities;
  }
}
