import { Injectable } from '@angular/core';
import { EMPTY, of, Observable } from 'rxjs';

import { GitHubDetails, GitProviderService, HelperService, TokenProvider } from 'ngx-launcher';
import { HttpService } from './http.service';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';

interface GitUser {
  login: string;
  avatarUrl: string;
  organizations: string[];
  repositories: string[];
}

@Injectable()
export class AppLauncherGitproviderService extends HttpService implements GitProviderService {

  private static API_BASE: string = '/services/git/';
  private repositories: object = {};

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
    return this.backendHttpGet<GitUser>(AppLauncherGitproviderService.API_BASE, 'user').pipe(
      filter((user) => Boolean(user && user.login)),
      map((user) => {
        this.repositories[''] = AppLauncherGitproviderService.removeOrganizationPrefix(user.repositories);
        const selectableOrgs = {};
        for (const org of user.organizations) {
          selectableOrgs[org] = org;
        }
        selectableOrgs[user.login] = undefined;
        return {
          authenticated: true,
          avatar: user.avatarUrl,
          login: user.login,
          organizations: selectableOrgs
        } as GitHubDetails;
      })
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
    const fullName = org ? `${org}/${repoName}` : repoName;
    return this.getRepositories(org).pipe(
      map((repositories) => {
        return repositories.indexOf(fullName) !== -1;
      })
    );
  }

  /**
   * Returns list 0f GitHub repos
   *
   * @param {string} org The GitHub org (e.g., fabric8-launcher/ngx-launcher)
   * @returns {Observable<any>} list of existing GitHub repos
   */
  public getGitHubRepoList(org: string): Observable<string[]> {
    return this.getRepositories(org).pipe(map(AppLauncherGitproviderService.removeOrganizationPrefix));
  }

  private getRepositories(org: string = ''): Observable<string[]> {
    if (this.repositories[org]) {
      return of(this.repositories[org]);
    }
    return this.backendHttpGet(this.createUrl(org)).pipe(
      map((json) => json ? json as string[] : []),
      map((repositories) => this.repositories[org] = repositories)
    );
  }

  private static removeOrganizationPrefix(repositories: string[]): string[] {
    return repositories.map((ele) => ele.replace(new RegExp('^[^/]+/'), ''));
  }

  private createUrl(org: string) {
    const url = this.joinPath(AppLauncherGitproviderService.API_BASE, 'repositories');
    return `${url}?organization=${org}`;
  }

  private redirectToAuth(url: string) {
    window.location.href = url;
  }
}
