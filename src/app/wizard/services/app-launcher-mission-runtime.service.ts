import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { Catalog, HelperService, MissionRuntimeService, TokenProvider } from 'ngx-launcher';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppLauncherMissionRuntimeService extends MissionRuntimeService {
  private static API_BASE: string = '/booster-catalog/';
  private httpService: HttpService;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) {
    super();
    this.httpService = new HttpService(http, helperService, tokenProvider);
  }

  public getCatalog(): Observable<Catalog> {
    return this.httpService.backendHttpGet(AppLauncherMissionRuntimeService.API_BASE);
  }
}
