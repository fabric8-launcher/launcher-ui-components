import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { HelperService, ProjectSummaryService, TokenProvider, Projectile, Config } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable()
export class AppLauncherProjectSummaryService extends HttpService implements ProjectSummaryService {

  private static LAUNCH: string = '/launcher/launch';
  private static ZIP: string = '/launcher/zip';

  constructor(
    private _http: HttpClient,
    private _helperService: HelperService,
    _tokenProvider: TokenProvider,
    private config: Config
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
          const json = projectile.toJson();
          this.copyProperties(projectile, json);
          const endpoint = this.isTargetOpenshift(projectile) ? 'launch' : 'zip';
          return this._http.post(this.joinPath(this.config.get('creator_url'), endpoint), json, option)
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
    return projectile.getState('FlowChoice').state.creatorFlow;
  }

  private copyProperties(projectile: Projectile<any>, object) {
    const runtimeId = projectile.getState('Runtimes').state.id;
    object.name = projectile.sharedState.state.projectName;
    object.shared = {};
    object.shared.runtime = projectile.getState('Runtimes').state.value;
    const version = {};
    version['version'] = projectile.sharedState.state.projectVersion;
    if (runtimeId === 'nodejs') {
      version['name'] = object.name;
      object.shared.nodejs = version;
    } else {
      version['artifactId'] = projectile.sharedState.state.mavenArtifact;
      version['groupId'] = projectile.sharedState.state.groupId;
      object.shared.maven = version;
    }

    const uniqueTierCount = object.capabilities.map((v) => v.tier)
      .filter((value, index, self) => self.indexOf(value) === index).lenght;
    if (uniqueTierCount === 1) {
      object.capabilities.map((c) => {
        delete c.tier;
        return c;
      });
    }
  }
}
