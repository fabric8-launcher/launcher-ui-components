import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Runtime, HelperService, TokenProvider } from 'ngx-launcher';
import { Capability } from 'ngx-launcher';
import { AppCreatorService } from 'ngx-launcher';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppLauncherAppCreatorService extends HttpService implements AppCreatorService {
  // TODO make configurable
  public static API_URL = 'http://api-creator-backend.devtools-dev.ext.devshift.net';

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
    return this.httpGet(AppLauncherAppCreatorService.API_URL, 'runtimes');
  }

  private filter(capabilities: Capability[]): Capability[] {
    for (const capability of capabilities) {
      const props = [];
      for (const prop of capability.props) {
        if (!prop.shared) {
          props.push(prop);
        }
      }
      capability.props = props as [{ shared?: boolean; }];
    }
    return capabilities;
  }
}
