import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Pipeline, PipelineService } from 'ngx-launcher';

@Injectable()
export class AppLauncherPipelineService implements PipelineService {

  public getPipelines(filterByRuntime: string = 'maven'): Observable<Pipeline[]> {
    return of([]);
  }
}
