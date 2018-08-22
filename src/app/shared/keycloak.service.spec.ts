import { Config } from 'ngx-launcher';
import { KeycloakService } from './keycloak.service';
import { KeycloakServiceImpl } from './keycloak.service.impl';


class KeycloakPromise {
  result: any;
  error: boolean;
  success: boolean;
  successCallback: Function;
  errorCallback: Function;
  promise: object = {
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
  }

  setSuccess(result?) {
    this.success = true;
    this.result = result;
    if (this.successCallback) {
      this.successCallback(result);
    }
  }

  setError(result?) {
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
  countInit:number = 0;
  countLogin:number = 0;
  countClearToken:number = 0;
  countUpdateToken:number = 0;

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

describe('Service: KeycloakService', () => {
  let mockKeycloakCore: MockKeycloakCore;
  let keycloakService: KeycloakService;

  beforeEach(() => {
    mockKeycloakCore = new MockKeycloakCore();
    keycloakService = new KeycloakServiceImpl(new MockConfig(), () => mockKeycloakCore);
  }

  it('Should login and logout correctly', () => {
    keycloakService.init().then(() => {
      expect(mockKeycloakCore.countInit).toBe(1);
    });
  });

});
