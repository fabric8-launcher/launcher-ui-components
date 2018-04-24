import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { GitHubDetails, GitProviderService, HelperService, TokenProvider, TokenService } from 'ngx-forge';
import { KeycloakService } from '../../shared/keycloak.service';
import { AppLauncherTokenService } from './app-launcher-token.service';

@Injectable()
export class AppLauncherGitproviderService implements GitProviderService {

    private END_POINT: string = '';
    private API_BASE: string = 'services/git/';
    private ORIGIN: string = '';
    private PROVIDER: string = 'GitHub';
    private gitHubUserLogin: string;

    constructor(
      private http: Http,
      private helperService: HelperService,
      private tokenProvider: TokenProvider,
      private keycloak: KeycloakService,
      private tokenService: TokenService
    ) {
      if (this.helperService) {
        this.END_POINT = this.helperService.getBackendUrl();
        this.ORIGIN = this.helperService.getOrigin();
      }
    }

    private get options(): Observable<RequestOptions> {
      let headers = new Headers();
      headers.append('X-App', this.ORIGIN);
      headers.set('x-git-provider', this.PROVIDER);
      return Observable.fromPromise(this.tokenProvider.token.then((token) => {
        headers.append('Authorization', 'Bearer ' + token);
        return new RequestOptions({
          headers: headers
        });
      }));
    }

  /**
   * Connect GitHub account
   *
   * @param {string} redirectUrl The GitHub redirect URL
   */
  connectGitHubAccount(redirectUrl: string): void {
    this.redirectToAuth(this.keycloak.linkAccount('github', redirectUrl));
  }

  /**
   * Get GitHub repos associated with given user name
   *
   * @returns {Observable<any>}
   */
  private getGitHubUserData(): Observable<any> {
    let url = this.END_POINT + this.API_BASE + 'user';
    let res = this.options.flatMap((option) => {
      return this.http.get(url, option)
        .map(response => response.json() as any)
        .catch(error => {
          return Observable.throw(error);
        });
      });
    return res;
  }


   /**
   * Get GitHub Organizations associated with given user name
   *
   * @param userName The GitHub user name
   * @returns {Observable<any>}
   */
  getUserOrgs(userName: string): Observable<any> {
    let url = this.END_POINT + this.API_BASE + 'organizations';
    let res = this.options.flatMap((option) => {
      return this.http.get(url, option)
        .map(response => response.json() as any)
        .catch(error => {
          return Observable.throw(error);
        });
      });
    return res;
  }


  /**
   * Returns GitHub details associated with the logged in user
   *
   * @returns {Observable<GitHubDetails>} The GitHub details associated with the logged in user
   */
  getGitHubDetails(): Observable<GitHubDetails> {
    return this.getGitHubUserData().flatMap(user => {
      if (user && user.login) {
        let orgs = [];
        return this.getUserOrgs(user.login).flatMap(orgsArr => {
          if (orgsArr && orgsArr.length >= 0) {
            orgs = orgsArr;
            this.gitHubUserLogin = user.login;
            orgs.push(this.gitHubUserLogin);
            let gitHubDetails = {
              authenticated: true,
              avatar: user.avatarUrl,
              login: user.login,
              organizations: orgs,
              organization: user.login
            } as GitHubDetails;
            return Observable.of(gitHubDetails);
          } else {
            return Observable.empty();
          }
        });
      } else {
        return Observable.empty();
      }
    });

  }

  /**
   * Returns true if GitHub repo exists
   *
   * @param {string} org The GitHub org (e.g., fabric8-launcher/ngx-launcher)
   * @param {string} repoName The GitHub repos name (e.g., ngx-launcher)
   * @returns {Observable<boolean>} True if GitHub repo exists
   */
  isGitHubRepo(org: string, repoName: string): Observable<boolean> {
    let fullName = org + '/' + repoName;
    let url: string;
    if (this.gitHubUserLogin === org) {
      url = this.END_POINT + this.API_BASE + 'repositories';
    } else {
      url = this.END_POINT + this.API_BASE + 'repositories/?organization=' + org;
    }
    let res = this.options.flatMap((option) => {
      return this.http.get(url, option)
        .map(response => {
            let repoList: string[] =  response.json();
            if (repoList.indexOf(fullName) === -1) {
              return false;
            } else {
              return true;
            }
          })
        .catch(error => {
          return Observable.throw(error);
        });
      });
    return res;
  }

  /**
   * Returns list 0f GitHub repos
   *
   * @param {string} org The GitHub org (e.g., fabric8-launcher/ngx-launcher)
   * @returns {Observable<any>} list of existing GitHub repos
   */
  getGitHubRepoList(org: string): Observable<any> {
    if (org === undefined) {
      return Observable.from([]);
    }
    let url = this.END_POINT + this.API_BASE + 'repositories';
    let location = org + '/';
    if (this.gitHubUserLogin !== org) {
      url += '?organization=' + org;
    }
    let res = this.options.flatMap((option) => {
      return this.http.get(url, option)
        .map(response => {
            let repoList: string[] = [];
            if (response) {
              let responseList: string[] =  response.json();
              responseList.forEach(function(ele) {
                repoList.push(ele.replace(location, ''));
              });
            }
            return repoList;
          })
        .catch(error => {
          return Observable.throw(error);
        });
      });
    return res;
  }

  // Private
  private getRequestParam(name: string): string {
    let param = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search);
    if (param !== null) {
      return decodeURIComponent(param[1]);
    }
    return null;
  }

  private redirectToAuth(url: string) {
    window.location.href = url;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
