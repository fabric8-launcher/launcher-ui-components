import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { GitHubDetails, GitProviderService, HelperService, TokenProvider, TokenService } from 'ngx-forge';
import { KeycloakService } from '../../shared/keycloak.service';
import { AppLauncherTokenService } from './app-launcher-token.service';
import { HttpService } from './http.service';

@Injectable()
export class AppLauncherGitproviderService extends HttpService implements GitProviderService {

    private static API_BASE: string = '/services/git/';
    private gitHubUserLogin: string;

    constructor(
      private _http: Http,
      private _helperService: HelperService,
      private _tokenProvider: TokenProvider,
      private keycloak: KeycloakService,
      private tokenService: TokenService
    ) {
      super(_http, _helperService, _tokenProvider)
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
    return this.httpGet(AppLauncherGitproviderService.API_BASE, 'user');
  }


   /**
   * Get GitHub Organizations associated with given user name
   *
   * @param userName The GitHub user name
   * @returns {Observable<any>}
   */
  getUserOrgs(userName: string): Observable<any> {
    return this.httpGet(AppLauncherGitproviderService.API_BASE, 'organizations');
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
    let res = this.options().flatMap((option) => {
      return this._http.get(this.createUrl(org), option)
        .map(response => {
            let repoList: string[] = response.json();
            return repoList.indexOf(fullName) !== -1;
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
    let res = this.options().flatMap((option) => {
      return this._http.get(this.createUrl(org), option)
        .map(response => {
            let repoList: string[] = [];
            if (response) {
              let responseList: string[] = response.json();
              responseList.forEach((ele) => repoList.push(ele.replace(org + '/', '')));
            }
            return repoList;
          })
        .catch(error => {
          return Observable.throw(error);
        });
      });
    return res;
  }

  private createUrl(org: string) {
    let url = this.joinPath([this._helperService.getBackendUrl(), AppLauncherGitproviderService.API_BASE, 'repositories']);
    if (this.gitHubUserLogin !== org) {
      url += '?organization=' + org;
    }
    return url;
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
}
