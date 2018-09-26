import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Config, GitHubDetails, HelperService, TokenProvider } from 'ngx-launcher';

import { AppLauncherGitproviderService } from './app-launcher-gitprovider.service';
import { LaunchConfig } from '../../shared/config.component';
import { LaunchHelper } from '../../shared/helper.component';
import { AuthService } from '../../shared/auth.service';
import { KeycloakAuthService } from '../../shared/keycloak.auth.service';

class MockTokenProvider extends TokenProvider {
  public getGitHubToken(): string | Promise<string> {
    return Promise.resolve('github_token');
  }

  public getToken(): string | Promise<string> {
    return Promise.resolve('token');
  }
}

describe('Service: AppLauncherGitproviderService', () => {
  let mockHttp: HttpTestingController;
  let appLauncherGitproviderService: AppLauncherGitproviderService;
  const serviceUrl = 'http://localhost:8080/api/services/git';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Config, useClass: LaunchConfig },
        { provide: HelperService, useClass: LaunchHelper, deps: [Config] },
        { provide: AuthService, useClass: KeycloakAuthService, deps: [Config] },
        { provide: TokenProvider, useClass: MockTokenProvider },
        AppLauncherGitproviderService
      ]
    });
    appLauncherGitproviderService = TestBed.get(AppLauncherGitproviderService);
    mockHttp = TestBed.get(HttpTestingController);
  });

  it('Get GitHubDetails', fakeAsync(() => {

    const gitHubDetails = {
      authenticated: true,
      avatar: 'http://avatar-url',
      login: 'user-login',
      organization: 'user-login',
      organizations: ['org1', 'org2', 'user-login']
    } as GitHubDetails;

    appLauncherGitproviderService.getGitHubDetails().subscribe((val: GitHubDetails) => {
      expect(val).toEqual(gitHubDetails);
    });
    tick();

    const reqUser = mockHttp.expectOne(`${serviceUrl}/user`);
    reqUser.flush({ login: 'user-login', avatarUrl: 'http://avatar-url', organizations: ['org1', 'org2'], repositories: ['user-login/repo-1', 'user-login/repo-2'] });
    tick();

    appLauncherGitproviderService.getGitHubRepoList(gitHubDetails.login).subscribe((repositories) => {
      expect(repositories).toEqual(['repo-1', 'repo-2']);
    });
    tick();

    appLauncherGitproviderService.getGitHubRepoList('org1').subscribe((repositories) => {
      expect(repositories).toEqual(['repo-1', 'repo-3']);
    });
    tick();

    const reqRepo = mockHttp.expectOne(`${serviceUrl}/repositories?organization=org1`);
    reqRepo.flush(['org1/repo-1', 'org1/repo-3']);
    tick();

  }));

  it('Get GitHubDetails empty orgs', fakeAsync(() => {
    const gitHubDetails = {
      authenticated: true,
      avatar: 'http://avatar-url',
      login: 'user-login',
      organization: 'user-login',
      organizations: ['user-login']
    } as GitHubDetails;

    appLauncherGitproviderService.getGitHubDetails().subscribe((val: GitHubDetails) => {
      expect(val).toEqual(gitHubDetails);
    });
    tick();

    const reqUser = mockHttp.expectOne(`${serviceUrl}/user`);
    reqUser.flush({ login: 'user-login', avatarUrl: 'http://avatar-url', organizations: [], repositories: ['user-login/repo-1'] });
    tick();
  }));


  it('Check if GitHubRepo exists', fakeAsync(() => {
    appLauncherGitproviderService.isGitHubRepo('fabric-ui', 'test-repo').subscribe((val: any) => {
      expect(val).toBeTruthy();
    });
    tick();

    const reqOrgs = mockHttp.expectOne(`${serviceUrl}/repositories?organization=fabric-ui`);
    reqOrgs.flush(['fabric-ui/test-repo']);
    tick();

    appLauncherGitproviderService.isGitHubRepo('fabric-ui', 'test-repo-1').subscribe((val: any) => {
      expect(val).toBeFalsy();
    });
    tick();

    mockHttp.expectNone(`${serviceUrl}/repositories?organization=fabric-ui`);
  }));

  afterEach(() => {
    mockHttp.verify();
  });
});
