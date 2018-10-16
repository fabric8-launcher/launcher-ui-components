import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { DependencyCheck, DependencyCheckService } from 'ngx-launcher';

@Injectable()
export class AppLauncherDependencyCheckService implements DependencyCheckService {

  /**
   * Returns project dependencies
   *
   * @returns {Observable<DependencyCheck>} Project dependencies
   */
  public getDependencyCheck(): Observable<DependencyCheck> {
    return of({
      mavenArtifact: 'booster',
      groupId: 'io.openshift.booster',
      projectName: undefined,
      projectVersion: '1.0.0-SNAPSHOT',
      spacePath: undefined,
      targetEnvironment: undefined
    });
  }

  public getApplicationsInASpace(): Observable<any[]> {
    return of([]);
  }
}
