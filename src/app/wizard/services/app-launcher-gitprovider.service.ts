import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { Observable } from 'rxjs-compat';

import { GitHubDetails, GitProviderService, HelperService, TokenProvider } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class AppLauncherGitproviderService extends HttpService implements GitProviderService {

  private static API_BASE: string = '/services/git/';
  private gitHubUserLogin: string;

  constructor(
    private _http: HttpClient,
    private _helperService: HelperService,
    private _tokenProvider: TokenProvider,
    private authService: AuthService
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  /**
   * Connect GitHub account
   *
   * @param {string} redirectUrl The GitHub redirect URL
   */
  public connectGitHubAccount(redirectUrl: string): void {
    this.redirectToAuth(this.authService.linkAccount('github', redirectUrl));
  }

  /**
   * Get GitHub Organizations associated with given user name
   *
   * @param {string} userName The GitHub user name
   * @returns {Observable<any>}
   */
  public getUserOrgs(userName: string): Observable<any> {
    return this.backendHttpGet(AppLauncherGitproviderService.API_BASE, 'organizations');
  }

  /**
   * Returns GitHub details associated with the logged in user
   *
   * @returns {Observable<GitHubDetails>} The GitHub details associated with the logged in user
   */
  public getGitHubDetails(): Observable<GitHubDetails> {
    return this.backendHttpGet<{ login: string; avatarUrl: string; }>(AppLauncherGitproviderService.API_BASE, 'user').pipe(
      filter((user) => Boolean(user && user.login)),

      flatMap((user) => this.getUserOrgs(user.login).pipe(map((orgs) => ({ user, orgs })))),
      filter((data) => data.orgs && data.orgs.length >= 0),
      map((data) => {
        data.orgs.push(data.user.login);
        // TODO fix this... realllly ugly
        this.gitHubUserLogin = data.user.login;
        return {
          authenticated: true,
          avatar: data.user.avatarUrl,
          login: data.user.login,
          organizations: data.orgs,
          organization: data.user.login
        } as GitHubDetails;
      }),
      catchError((error: any) => {
        console.warn(`User has not authorized GitHub: ${error}`);
        return EMPTY;
      }),
    );
  }

  /**
   * Returns true if GitHub repo exists
   *
   * @param {string} org The GitHub org (e.g., fabric8-launcher/ngx-launcher)
   * @param {string} repoName The GitHub repos name (e.g., ngx-launcher)
   * @returns {Observable<boolean>} True if GitHub repo exists
   */
  public isGitHubRepo(org: string, repoName: string): Observable<boolean> {
    const fullName = org + '/' + repoName;
    return this.backendHttpGet(this.createUrl(org)).pipe(
      map((json) => {
        const repoList: string[] = json as string[];
        return repoList.indexOf(fullName) !== -1;
      })
    );
  }

  /**
   * Returns list 0f GitHub repos
   *
   * @param {string} org The GitHub org (e.g., fabric8-launcher/ngx-launcher)
   * @returns {Observable<any>} list of existing GitHub repos
   */
  public getGitHubRepoList(org: string): Observable<any> {
    if (org === undefined) {
      return of([]);
    }
    return this.backendHttpGet(this.createUrl(org)).pipe(
      map((json) => {
        const repoList: string[] = [];
        if (json) {
          const responseList: string[] = json as string[];
          responseList.forEach((ele) => repoList.push(ele.replace(org + '/', '')));
        }
        return repoList;
      })
    );
  }

  private createUrl(org: string) {
    let url = this.joinPath(AppLauncherGitproviderService.API_BASE, 'repositories');
    if (this.gitHubUserLogin !== org) {
      url += '?organization=' + org;
    }
    return url;
  }

  private redirectToAuth(url: string) {
    window.location.href = url;
  }
}
