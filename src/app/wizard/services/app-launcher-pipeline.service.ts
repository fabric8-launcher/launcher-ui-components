import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs-compat';

import { Pipeline, PipelineService } from 'ngx-launcher';

@Injectable()
export class AppLauncherPipelineService implements PipelineService {

  public getPipelines(filterByRuntime: string = 'maven'): Observable<Pipeline[]> {
    return of([]);
  }
}
