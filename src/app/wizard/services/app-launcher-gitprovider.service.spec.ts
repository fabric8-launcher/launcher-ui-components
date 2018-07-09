import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Config, GitHubDetails, HelperService, TokenProvider } from 'ngx-launcher';

import { AppLauncherGitproviderService } from './app-launcher-gitprovider.service';
import { LaunchConfig } from '../../shared/config.component';
import { KeycloakService } from '../../shared/keycloak.service';
import { LaunchHelper } from '../../shared/helper.component';

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
        KeycloakService,
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
    reqUser.flush({ login: 'user-login', avatarUrl: 'http://avatar-url' });
    tick();

    const reqOrgs = mockHttp.expectOne(`${serviceUrl}/organizations`);
    reqOrgs.flush(['org1', 'org2']);
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
    reqUser.flush({ login: 'user-login', avatarUrl: 'http://avatar-url' });
    tick();

    const reqOrgs = mockHttp.expectOne(`${serviceUrl}/organizations`);
    reqOrgs.flush([]);
    tick();
  }));

  it('Get UserOrgs', fakeAsync(() => {
    const orgs = ['fabric-ui'];
    appLauncherGitproviderService.getUserOrgs('login').subscribe((val) => {
      expect(val).toEqual(orgs);
    });
    tick();

    const reqOrgs = mockHttp.expectOne(`${serviceUrl}/organizations`);
    reqOrgs.flush(['fabric-ui']);
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
  }));

  afterEach(() => {
    mockHttp.verify();
  });
});
