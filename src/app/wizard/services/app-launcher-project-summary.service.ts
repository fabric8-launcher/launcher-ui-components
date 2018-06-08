import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  RequestOptions,
  Response
} from '@angular/http';

import { Observable } from 'rxjs';

import {
  HelperService,
  ProjectSummaryService,
  Summary,
  TokenProvider,
  Cluster
} from 'ngx-forge';
import { HttpService } from './http.service';

@Injectable()
export class AppLauncherProjectSummaryService extends HttpService implements ProjectSummaryService {

  private static LAUNCH: string = '/launcher/launch';
  private static ZIP: string = '/launcher/zip';

  constructor(
    private _http: Http,
    private _helperService: HelperService,
    private _tokenProvider: TokenProvider
  ) {
    super(_http, _helperService, _tokenProvider)
  }

  /**
   * Set up the project for the given summary
   *
   * @param {Summary} summary The project summary
   * @returns {Observable<boolean>}
   */
  setup(summary: Summary): Observable<boolean> {
    const summaryEndPoint: string = this.joinPath([this._helperService.getBackendUrl(),
      (this.isTargetOpenshift(summary) ? AppLauncherProjectSummaryService.LAUNCH : AppLauncherProjectSummaryService.ZIP)]);
    return this.options(summary.cluster).flatMap((option) => {
      if (this.isTargetOpenshift(summary)) {
        return this._http.post(summaryEndPoint, this.getPayload(summary), option)
          .map(response => {
            console.log(response.json());
            return response.json();
          }).catch(this.handleError);
      } else {
        window.open(summaryEndPoint + '?' + this.getPayload(summary));
        //todo fix need of returning dummy uuid_link
        return Observable.of({ "uuid_link": "zip" });
      }
    });
  }

  private isTargetOpenshift(summary: Summary) {
    return summary.targetEnvironment === 'os';
  }

  /**
   * Verify the project for the given summary
   *
   * @param {Summary} summary The project summary
   * @returns {Observable<boolean>}
   */
  verify(summary: Summary): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Get the current context details
   *
   * @returns {Observable<Context>}
   */
  getCurrentContext(): Observable<any> {
    return Observable.of({});
  }

  private getPayload(summary: Summary) {
    let payload =
      'mission=' + summary.mission.id +
      '&runtime=' + summary.runtime.id +
      '&runtimeVersion=' + summary.runtime.version.id +
      '&projectName=' + summary.dependencyCheck.projectName +
      '&projectVersion=' + summary.dependencyCheck.projectVersion +
      '&groupId=' + summary.dependencyCheck.groupId +
      '&artifactId=' + summary.dependencyCheck.mavenArtifact +
      '&gitRepository=' + summary.gitHubDetails.repository;
    if (summary.gitHubDetails.login !== summary.gitHubDetails.organization) {
      payload += '&gitOrganization=' + summary.gitHubDetails.organization;
    }
    return payload;
  }

}
