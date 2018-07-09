import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { of } from 'rxjs';
import { Observable } from 'rxjs-compat';

import { HelperService, ProjectSummaryService, Summary, TokenProvider } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable()
export class AppLauncherProjectSummaryService extends HttpService implements ProjectSummaryService {

  private static LAUNCH: string = '/launcher/launch';
  private static ZIP: string = '/launcher/zip';

  constructor(
    private _http: HttpClient,
    private _helperService: HelperService,
    private _tokenProvider: TokenProvider
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  /**
   * Set up the project for the given summary
   *
   * @param {Summary} summary The project summary
   * @returns {Observable<boolean>}
   */
  public setup(summary: Summary, retry?: number): Observable<any> {
    const target = this.isTargetOpenshift(summary) ?
      AppLauncherProjectSummaryService.LAUNCH : AppLauncherProjectSummaryService.ZIP;
    const summaryEndPoint: string = this.joinPath(this._helperService.getBackendUrl(), target);
    return this.options(summary.cluster, retry).pipe(
      flatMap((option) => {
        if (this.isTargetOpenshift(summary)) {
          return this._http.post(summaryEndPoint, this.getPayload(summary), option)
            .pipe(catchError(HttpService.handleError));
        } else {
          window.open(summaryEndPoint + '?' + this.getPayload(summary));
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

  private isTargetOpenshift(summary: Summary) {
    return summary.targetEnvironment === 'os';
  }

  private getPayload(summary: Summary): HttpParams {
    const body = new HttpParams()
      .append('mission', summary.mission.id)
      .append('runtime', summary.runtime.id)
      .append('runtimeVersion', summary.runtime.version.id)
      .append('projectName', summary.dependencyCheck.projectName)
      .append('projectVersion', summary.dependencyCheck.projectVersion)
      .append('groupId', summary.dependencyCheck.groupId)
      .append('artifactId', summary.dependencyCheck.mavenArtifact)
      .append('gitRepository', summary.gitHubDetails.repository);
    if (summary.gitHubDetails.login !== summary.gitHubDetails.organization) {
      return body.append('gitOrganization', summary.gitHubDetails.organization);
    }
    return body;
  }

}
