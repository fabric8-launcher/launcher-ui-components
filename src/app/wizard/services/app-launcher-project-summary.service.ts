import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { HelperService, ProjectSummaryService, TokenProvider, Projectile } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, flatMap } from 'rxjs/operators';
import { AppLauncherAppCreatorService } from './app-launcher-app-creator.service';

@Injectable()
export class AppLauncherProjectSummaryService extends HttpService implements ProjectSummaryService {

  private static LAUNCH: string = '/launcher/launch';
  private static ZIP: string = '/launcher/zip';

  constructor(
    private _http: HttpClient,
    private _helperService: HelperService,
    _tokenProvider: TokenProvider
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  /**
   * Set up the project for the given summary
   *
   * @param {Summary} projectile The project summary
   * @returns {Observable<boolean>}
   */
  public setup(projectile: Projectile<any>, retry?: number): Observable<any> {
    const target = this.isTargetOpenshift(projectile) ?
      AppLauncherProjectSummaryService.LAUNCH : AppLauncherProjectSummaryService.ZIP;
    const summaryEndPoint: string = this.joinPath(this._helperService.getBackendUrl(), target);
    return this.options(projectile.getState('TargetEnvironment').state.cluster, retry).pipe(
      flatMap((option) => {
        if (this.isCreatorFlow(projectile)) {
          this.copyProperties(projectile);
          const json = projectile.toJson();
          json.name = projectile.sharedState.state.projectName;
          return this._http.post(this.joinPath(AppLauncherAppCreatorService.API_URL, 'launch'), json, option)
            .pipe(catchError(HttpService.handleError));
        } else if (this.isTargetOpenshift(projectile)) {
          return this._http.post(summaryEndPoint, projectile.toHttpPayload(), option)
            .pipe(catchError(HttpService.handleError));
        } else {
          window.open(summaryEndPoint + '?' + projectile.toHttpPayload());
          // todo fix need of returning dummy uuid_link
          return of({ uuid_link: 'zip' });
        }
      }));
  }

  /**
   * Get the current context details
   *
   * @returns {Observable<Context>}
   */
  public getCurrentContext(): Observable<any> {
    return of({});
  }

  private isTargetOpenshift(summary: Projectile<any>) {
    return summary.sharedState.state.targetEnvironment === 'os';
  }

  private isCreatorFlow(projectile: Projectile<any>): boolean {
    return projectile.getState('Capabilities') !== undefined;
  }

  private copyProperties(projectile: Projectile<any>) {
    const capabilities = projectile.getState('Capabilities').state.capabilities;
    const runtimeId = projectile.getState('Runtimes').state.id;
    for (const capability of capabilities) {
      capability.shared = {};
      capability.shared['runtime'] = runtimeId;
      capability.shared['artifactId'] = projectile.sharedState.state.mavenArtifact;
      capability.shared['groupId'] = projectile.sharedState.state.groupId;
      capability.shared['version'] = projectile.sharedState.state.projectVersion;
    }
  }
}
