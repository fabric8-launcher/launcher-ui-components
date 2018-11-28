import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Enums, HelperService, TokenProvider, Config } from 'ngx-launcher';
import { Capability, Property } from 'ngx-launcher';
import { AppCreatorService } from 'ngx-launcher';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppLauncherAppCreatorService extends HttpService implements AppCreatorService {
  private enums: Enums;

  private readonly url = this.config.get('creator_url');

  constructor(
    _http: HttpClient,
    _helperService: HelperService,
    _tokenProvider: TokenProvider,
    private config: Config
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  public getFilteredCapabilities(): Observable<Capability[]> {
    return this.getCapabilities().pipe(map((capabilities) => this.filter(capabilities)));
  }

  public getCapabilities(): Observable<Capability[]> {
    return this.getEnums().pipe(flatMap(() => this.httpGet<Capability[]>(this.url, 'capabilities')));
  }

  public getEnums(): Observable<Enums> {
    return this.httpGet<Enums>(this.url, 'enums').pipe(map((value) => {
      this.enums = value;
      return value;
    }));
  }

  private filter(capabilities: Capability[]): Capability[] {
    for (const capability of capabilities) {
      const props: Property[] = [];
      for (const prop of capability.props) {
        if (!prop.shared || prop.id === 'runtime') {
          prop.values = prop.id === 'runtime' ? prop.values : this.enums[prop.id];
          prop['value'] = prop['default'];
          props.push(prop);
        }
      }
      capability.props = props;
    }
    return capabilities;
  }
}
