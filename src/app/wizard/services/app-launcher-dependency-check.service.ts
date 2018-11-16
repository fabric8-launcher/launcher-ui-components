import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { DependencyCheck, DependencyCheckService, Config } from 'ngx-launcher';

@Injectable()
export class AppLauncherDependencyCheckService implements DependencyCheckService {

  constructor(private config: Config) {}

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
      targetEnvironment: this.config.get('targetenvironment_skip') === 'true' ? 'os' : undefined
    });
  }

  public getApplicationsInASpace(): Observable<any[]> {
    return of([]);
  }
}
