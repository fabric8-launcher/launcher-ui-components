import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Catalog, Config } from 'ngx-launcher';

import { LaunchConfig } from './shared/config.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { Broadcaster } from 'ngx-base';
import { Logger } from './shared/logger.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routes';
import { WizardModule } from './wizard/wizard.module';
import { AuthService, User } from './shared/auth.service';

// tslint:disable-next-line
const launchMockData = require('../assets/mock/demo-catalog-launch.json') as Catalog;

class MockAuthService extends AuthService {

  public init(): Promise<AuthService> {
    return Promise.resolve(this as AuthService);
  }

  public login(): Promise<User> {
    this._user = {
      name: 'andy',
      preferredName: 'pref',
      token: 'token',
      sessionState: 'session',
      accountLink: new Map<string, string>(),
    };
    return Promise.resolve(this._user);
  }

  public logout() {
    this._user = null;
  }

  public linkAccount(provider: string, redirect?: string): string {
    return `linkAccount:${provider}`;
  }

  public getToken(): Promise<string> {
    if (!this.isAuthenticated()) {
      return Promise.reject();
    }
    return Promise.resolve(this.user.token);
  }

  public isEnabled(): boolean {
    return true;
  }
}

describe('AppComponent', () => {
  const serviceUrl = 'http://localhost:8080/api';
  let mockHttp: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;
  let router: Router;
  let authService: AuthService;

  function completeTick(millis?: number) {
    tick(millis);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();
  }

  function getMissionsSection(): Element {
    return element.querySelectorAll('#MissionRuntime .card-pf-body')[0];
  }

  function getMissionItem(index: number): Element {
    return getMissionsSection().querySelectorAll('.list-group-item')[index];
  }

  function getRuntimesSection(): Element {
    return element.querySelectorAll('#MissionRuntime .card-pf-body')[1];
  }

  function getRuntimeItem(index: number): Element {
    return getRuntimesSection().querySelectorAll('.list-group-item')[index];
  }

  function checkStepCompletion(stepId: string) {
    const continueToSelectBoosterStepButton = element.querySelector<HTMLButtonElement>(`#${stepId} .f8launcher-continue button`);
    expect(continueToSelectBoosterStepButton).toBeTruthy(`${stepId}: continue button must be visible`);
    expect(continueToSelectBoosterStepButton.disabled).toBeFalsy(`${stepId}: continue button must be enabled`);
    continueToSelectBoosterStepButton.click();
    completeTick(1000);
    console.log(`Completed step: ${stepId}`);
  }

  function selectBoosterItem(item: Element) {
    const radioBtn = item.querySelector('input[type="radio"]') as HTMLInputElement;
    radioBtn.click();
    completeTick();
  }

  function isBoosterItemSelected(item: Element): boolean {
    return item.classList.contains('selected-list-item');
  }

  beforeEach(async((done) => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        WizardModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        Broadcaster,
        Logger,
        { provide: Config, useClass: LaunchConfig },
        { provide: AuthService, useClass: MockAuthService },
      ]
    }).compileComponents().then(() => {
      router = TestBed.get(Router);
      fixture = TestBed.createComponent(AppComponent);
      mockHttp = TestBed.get(HttpTestingController);
      authService = TestBed.get(AuthService);
      element = fixture.nativeElement;
      router.initialNavigation();
    }).then(done);
  }));

  it('Should login and start wizard', fakeAsync(() => {
    router.navigate(['/']);
    completeTick();
    const launchButton = fixture.debugElement.query(By.css('.launch-box a.btn'));
    expect(launchButton).toBeTruthy('Launch link is not in the view');
    launchButton.nativeElement.click();
    completeTick();
    const loginButton = fixture.debugElement.query(By.css('.blank-slate-pf-main-action button'));
    expect(loginButton).toBeTruthy('Login button is not in the view');
    loginButton.nativeElement.click();
    completeTick();
    expect(authService.isAuthenticated).toBeTruthy('User should be authenticated');
  }));

  it('Should set application name and start wizard and go through all steps', fakeAsync(() => {
    fixture.detectChanges();
    authService.login();
    router.navigate(['/wizard/app-name']);
    completeTick();

    tick();

    // Requests
    const reqClusters = mockHttp.expectOne(`${serviceUrl}/services/openshift/clusters`);
    reqClusters.flush([{
      connected: true,
      cluster: { id: 'starter-us-west-1', name: 'Starter: US West (California)', type: 'starter' }
    }]);
    completeTick();

    const reqBoosters = mockHttp.expectOne(`${serviceUrl}/booster-catalog/`);
    reqBoosters.flush(launchMockData);
    completeTick();

    const reqUser = mockHttp.expectOne(`${serviceUrl}/services/git/user`);
    reqUser.flush({ login: 'andy', avatarUrl: 'avatarUrl', repositories: ['ia3andy/repo1', 'ia3andy/repo2'], organizations: [] });
    completeTick();

    tick(501);

    // Step 1: TargetEnvironment
    const targetEnvInput = element.querySelectorAll<HTMLInputElement>('input[name="target-environment"');
    expect(targetEnvInput.length).toBe(2, 'There must be 2 target environments');
    targetEnvInput.item(0).click();
    completeTick();

    checkStepCompletion('TargetEnvironment');

    // Step 2: Booster selection
    const missionItem = getMissionItem(0);
    selectBoosterItem(missionItem);
    expect(isBoosterItemSelected(missionItem)).toBeTruthy();

    const runtimeItem = getRuntimeItem(0);
    selectBoosterItem(runtimeItem);
    expect(isBoosterItemSelected(runtimeItem)).toBeTruthy();

    checkStepCompletion('MissionRuntime');

    checkStepCompletion('GitProvider');

    const launchButton = element.querySelector<HTMLButtonElement>(`#ProjectSummary.f8launcher-continue button`);
    expect(launchButton).toBeTruthy(`ProjectSummary: launch button must be visible`);
    expect(launchButton.disabled).toBeFalsy(`ProjectSummary: launch button must be enabled`);
    launchButton.click();
    completeTick(1000);

    const reqLaunch = mockHttp.expectOne(`${serviceUrl}/launcher/launch`);
    reqLaunch.flush({ uuid_link: '/uuid/1234' });

    completeTick(500);

    const nextStepPage = element.querySelector<HTMLButtonElement>(`#NewProjectBooster`);
    expect(nextStepPage).toBeTruthy('Next step page is visible :)');

    console.log(`Completed wizard`);

  }));

  afterEach(() => {
    mockHttp.verify();
  });

});
