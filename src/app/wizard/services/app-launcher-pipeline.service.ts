import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import {
  HelperService,
  Pipeline,
  PipelineService,
  TokenProvider
} from 'ngx-forge';

@Injectable()
export class AppLauncherPipelineService implements PipelineService {

  constructor() {}

  getPipelines(filterByRuntime: string = 'maven'): Observable<Pipeline[]> {
    return Observable.of([]);
  }
}
