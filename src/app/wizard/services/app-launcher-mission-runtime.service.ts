import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { HelperService, MissionRuntimeService, Catalog, TokenProvider } from 'ngx-forge';
import { HttpService } from './http.service';

@Injectable()
export class AppLauncherMissionRuntimeService extends MissionRuntimeService {
  private static API_BASE: string = '/booster-catalog/';
  private httpService: HttpService;

  constructor(
    private http: Http,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) {
    super();
    this.httpService = new HttpService(http, helperService, tokenProvider);
  }

  getCatalog(): Observable<Catalog> {
    return this.httpService.httpGet(AppLauncherMissionRuntimeService.API_BASE);
  }
}
