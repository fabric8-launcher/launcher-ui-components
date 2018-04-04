import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DependencyCheck, DependencyCheckService } from 'ngx-forge';

@Injectable()
export class AppLauncherDependencyCheckService implements DependencyCheckService {
  /**
   * Returns project dependencies
   *
   * @returns {Observable<DependencyCheck>} Project dependencies
   */
  getDependencyCheck(): Observable<DependencyCheck> {
    return Observable.of({
      mavenArtifact: 'booster',
      groupId: 'io.openshift.booster',
      projectName: 'App-test-1',
      projectVersion: '1.0.0-SNAPSHOT',
      spacePath: '/myspace'
    });
  }
}
