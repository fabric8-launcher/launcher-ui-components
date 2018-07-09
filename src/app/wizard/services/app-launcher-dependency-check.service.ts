import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { of } from 'rxjs';

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
      projectName: '',
      projectVersion: '1.0.0-SNAPSHOT',
      spacePath: '/myspace'
    });
  }

  /**
   * Validate the project name and returns a boolean value
   *
   * @param  {string} projectName
   * @returns boolean
   */
  public validateProjectName(projectName: string): boolean {
    // allows only '-'
    const pattern = /^[a-z][a-z0-9-]{3,63}$/;
    return pattern.test(projectName);
  }

  /**
   * Validate the artifact id and returns a boolean value
   *
   * @param  {string} artifactId
   * @returns boolean
   */
  public validateArtifactId(artifactId: string): boolean {
    // allows only '-'
    return this.validateProjectName(artifactId);
  }

  /**
   * Validates the group id with a regex and returns a boolean value
   *
   * @param  {string} groupId
   * @returns boolean
   */
  public validateGroupId(groupId: string): boolean {
    // allows only '.'
    const pattern = /^[a-z][a-z0-9.]{3,63}$/;
    return pattern.test(groupId);
  }

  /**
   * Validates the project version with a regex and returns a boolean value
   *
   * @param  {string} projectVersion
   * @returns boolean
   */
  public validateProjectVersion(projectVersion: string): boolean {
    // allows '.' and '-'
    const pattern = /^[a-z][a-z0-9-.]{3,63}$/;
    return pattern.test(projectVersion);
  }

  public getApplicationsInASpace(): Observable<any[]> {
    return of([]);
  }
}
