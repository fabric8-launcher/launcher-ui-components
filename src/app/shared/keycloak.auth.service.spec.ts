import { Config } from 'ngx-launcher';
import { AuthService, User } from './auth.service';
import { KeycloakAuthService } from './keycloak.auth.service';

class KeycloakPromise {
  private result: any;
  private error: boolean;
  private success: boolean;
  private successCallback: (result: any) => void;
  private errorCallback: (result: any) => void;
  public promise: object = {
    success: (callback) => {
      if (this.success) {
        callback(this.result);
      } else if (!this.error) {
        this.successCallback = callback;
      }
      return this.promise;
    },
    error: (callback) => {
      if (this.error) {
        callback(this.result);
      } else if (!this.success) {
        this.errorCallback = callback;
      }
      return this.promise;
    }
  };

  public setSuccess(result?) {
    this.success = true;
    this.result = result;
    if (this.successCallback) {
      this.successCallback(result);
    }
  }

  public setError(result?) {
    this.error = true;
    this.result = result;
    if (this.errorCallback) {
      this.errorCallback(result);
    }
  }
}

class MockConfig extends Config {
  protected readonly settings = {
    origin: 'launcher',
    keycloak_url: 'http://keycloak.test',
    keycloak_realm: 'test-realm',
    keycloak_client_id: 'test-client',
  };

  public get(key: string): string {
    return this.settings[key];
  }
}

class MockDisabledConfig extends Config {
  protected readonly settings = {
    origin: 'launcher',
  };

  public get(key: string): string {
    return this.settings[key];
  }
}

class MockKeycloakCore {
  tokenParsed: object;
  authServerUrl: string;
  token: string;
  countInit: number = 0;
  countLogin: number = 0;
  countClearToken: number = 0;
  countUpdateToken: number = 0;

  init() {
    const promise = new KeycloakPromise();
    this.countInit++;
    this.authServerUrl = 'http://mock.fr';
    promise.setSuccess();
    return promise.promise;
  }

  login() {
    const promise = new KeycloakPromise();
    this.tokenParsed = {
      name: 'andy',
      preferred_username: 'pref',
      session_state: 'session',
    };
    this.token = 'token';
    this.countLogin++;
    promise.setSuccess();
    return promise.promise;
  }

  clearToken() {
    this.tokenParsed = null;
    this.token = null;
    this.countClearToken++;
  }

  updateToken(val: number) {
    const promise = new KeycloakPromise();
    this.countUpdateToken++;
    promise.setSuccess();
    return promise.promise;
  }
}

describe('Service: KeycloakAuthService', () => {
  let mockKeycloakCore: MockKeycloakCore;
  let authService: AuthService;
  let currentLocation;
  const expectedUser:User = {
    token: 'token',
    accountLink: {},
    name: 'andy',
    sessionState: 'session',
    preferredName: 'pref'
  } as User;

  beforeEach(() => {
    mockKeycloakCore = new MockKeycloakCore();
    authService = new KeycloakAuthService(new MockConfig(), () => mockKeycloakCore, (url) => currentLocation = url);
  });

  it('Should init and not be authenticated when core is not authenticated', (done) => {
    authService.init().then(() => {
      expect(mockKeycloakCore.countInit).toBe(1);
      expect(authService.isAuthenticated()).toBeFalsy();
      expect(authService.user).toBeFalsy();
      done();
    });
  });

  it('Should init and be authenticated when core is authenticated', (done) => {
    mockKeycloakCore.login();
    authService.init().then(() => {
      expect(mockKeycloakCore.countInit).toBe(1);
      expect(authService.isAuthenticated()).toBeTruthy();
      expect(authService.user).toEqual(expectedUser);
      done();
    });
  });

  it('Should be authenticated after login', (done) => {
    authService.login().then((loggedUser) => {
      expect(mockKeycloakCore.countLogin).toBe(1);
      expect(authService.isAuthenticated()).toBeTruthy();
      expect(authService.user).toEqual(expectedUser);
      expect(loggedUser).toEqual(expectedUser);
      done();
    });
  });

  it('Should not be authenticated after login and logout', () => {
    authService.init().then(() => {});
    authService.login().then(() => {});
    expect(authService.isAuthenticated()).toBeTruthy();
    authService.logout();
    expect(mockKeycloakCore.countClearToken).toBe(1);
    expect(currentLocation).toContain('http://mock.fr/realms/test-realm/protocol/openid-connect/logout?redirect_uri=');
    expect(authService.isAuthenticated()).toBeFalsy();
    expect(authService.user).toBeNull();
  });

  it('Should not return token when not authenticated', (done) => {
    authService.getToken().then(() => {
      fail(new Error('Promise should not be resolved'));
      done();
    }, () => {
      done();
    });
  });

  it('Should return token when authenticated', (done) => {
    authService.login().then(() => {});
    expect(authService.isAuthenticated()).toBeTruthy();
    authService.getToken().then((token) => {
      expect(mockKeycloakCore.countUpdateToken).toBe(1);
      expect(token).toBe(expectedUser.token);
      done();
    });
  });

  it('Should not use core when auth is disabled', () => {
    authService = new KeycloakAuthService(new MockDisabledConfig(), () => mockKeycloakCore);
    authService.init().then(() => {});
    authService.login().then(() => {});
    authService.getToken().then(() => {});
    authService.logout();
    expect(authService.isEnabled()).toBeFalsy();
    expect(authService.isAuthenticated).toBeTruthy();
    expect(mockKeycloakCore.countInit).toBe(0);
    expect(mockKeycloakCore.countLogin).toBe(0);
    expect(mockKeycloakCore.countUpdateToken).toBe(0);
    expect(mockKeycloakCore.countClearToken).toBe(0);
  });

});
