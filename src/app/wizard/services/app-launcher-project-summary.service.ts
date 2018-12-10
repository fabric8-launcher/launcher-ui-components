import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { HelperService, ProjectSummaryService, TokenProvider, Projectile, Config } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, flatMap } from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable()
export class AppLauncherProjectSummaryService extends HttpService implements ProjectSummaryService {

  private static LAUNCH: string = '/launcher/launch';
  private static ZIP: string = '/launcher/zip';
  private static template = {
    project: {
      application: 'fubar',
      tiers: [
        {
          tier: 'backend',
          shared: {},
          capabilities: [
          ],
        },
        {
          tier: 'support',
          shared: {},
          capabilities: [{
            module: 'welcome',
          }],
        },
        {
          tier: 'frontend',
          shared: {},
          capabilities: [{
            module: 'web-app',
          }],
        }
      ]
    }
  };

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
          const json = this.copyProperties(projectile);
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

  private copyProperties(projectile: Projectile<any>): any {
    const result = _.cloneDeep(AppLauncherProjectSummaryService.template);
    result.project.application = projectile.sharedState.state.projectName;
    let nroTiers = 0;

    const capabilityState = projectile.getState('Capabilities').state;
    const capabilities = new Map(capabilityState.capabilities as Map<string, any>);

    const frontend = projectile.getState('Frontend').state;
    if (frontend.value.name) {
      nroTiers++;
      result.project.tiers[2].shared.framework = frontend.value;
      capabilities.delete(frontend.value.name);
    } else {
      result.project.tiers.splice(2, 1);
    }

    const runtime = projectile.getState('Runtimes').state;
    if (capabilities.has('welcome') && nroTiers === 1 && runtime.value.name) {
      nroTiers++;
      capabilities.delete('welcome');
    } else {
      result.project.tiers.splice(1, 1);
    }

    if (runtime.value.name) {
      nroTiers++;
      result.project.tiers[0].shared.runtime = runtime.value;
      result.project.tiers[0].capabilities = Array.from(capabilities.values());
      const version = {};
      version['version'] = projectile.sharedState.state.projectVersion;
      if (runtime.id === 'nodejs') {
        version['name'] = result.project.application;
        result.project.tiers[0].shared.nodejs = version;
      } else {
        version['artifactId'] = projectile.sharedState.state.mavenArtifact;
        version['groupId'] = projectile.sharedState.state.groupId;
        result.project.tiers[0].shared.maven = version;
      }
    } else {
      result.project.tiers.splice(0, 1);
    }

    Object.assign(result, this.stateToObject(projectile.getState('GitProvider')));
    Object.assign(result, this.stateToObject(projectile.getState('TargetEnvironment')));
    result.projectName = result.project.application;

    if (nroTiers < 3) {
      result.project.tiers.forEach((t) => delete t.tier);
    }
    return result;
  }

  private stateToObject(state: any) {
    const result = {};
    state.save().map((f) => {
      if (f.value) {
        result[f.name] = f.value;
      }
    });
    return result;
  }
}
