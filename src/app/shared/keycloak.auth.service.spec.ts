import { Config } from 'ngx-launcher';
import { AuthService } from './auth.service';
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

class MockKeycloakCore {
  tokenParsed: object;
  token: string;
  countInit: number = 0;
  countLogin: number = 0;
  countClearToken: number = 0;
  countUpdateToken: number = 0;

  init() {
    const promise = new KeycloakPromise();
    this.countInit++;
    promise.setSuccess();
    return promise;
  }

  login() {
    const promise = new KeycloakPromise();
    this.tokenParsed = {
      name: 'andy',
      preferred_name: 'pref',
      session_state: 'session',
    };
    this.token = 'token';
    this.countLogin++;
    promise.setSuccess();
    return promise;
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
    return promise;
  }
}

describe('Service: KeycloakAuthService', () => {
  let mockKeycloakCore: MockKeycloakCore;
  let authService: AuthService;

  beforeEach(() => {
    mockKeycloakCore = new MockKeycloakCore();
    authService = new KeycloakAuthService(new MockConfig(), () => mockKeycloakCore);
  });

  it('Should login and logout correctly', () => {
    authService.init().then(() => {
      expect(mockKeycloakCore.countInit).toBe(1);
    });
  });

});
