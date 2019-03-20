import * as jsSHA from 'jssha';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Keycloak from 'keycloak-js';
import { AuthenticationApi, OptionalUser } from '../authentication-api';
import { checkNotNull } from 'launcher-client';

interface StoredData {
  token: string;
  refreshToken?: string;
  idToken?: string;
}

export interface KeycloakConfig {
  clientId: string;
  realm: string;
  url: string;
}

export class KeycloakAuthenticationApi implements AuthenticationApi {

  private _user: OptionalUser;
  private currentRefresh?: Promise<OptionalUser> = undefined;
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;

  private static base64ToUri(b64: string): string {
    return b64.replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private readonly keycloak: Keycloak.KeycloakInstance;

  constructor(private config: KeycloakConfig, keycloakCoreFactory = Keycloak) {
    this.keycloak = keycloakCoreFactory(config);
  }

  public setOnUserChangeListener(listener: (user: OptionalUser) => void) {
    this.onUserChangeListener = listener;
  }

  public init = (): Promise<OptionalUser> => {
    return new Promise((resolve, reject) => {
      const sessionKC = KeycloakAuthenticationApi.getStoredData();
      this.keycloak.init({...sessionKC, checkLoginIframe: false})
        .error((e) => reject(e))
        .success(() => {
          this.initUser();
          resolve(this._user);
        });
      this.keycloak.onTokenExpired = () => {
        this.refreshToken()
          .catch(e => console.error(e));
      };
    });
  };

  public get user() {
    return this._user;
  }

  public login = () => {
    this.keycloak.login();
    return Promise.resolve();
  };

  public logout = () => {
    KeycloakAuthenticationApi.clearStoredData();
    this.keycloak.logout();
  };

  public getAccountManagementLink = () => {
    if (!this._user) {
      return undefined;
    }
    return this.keycloak.createAccountUrl();
  };

  public refreshToken = (): Promise<OptionalUser> => {
    // Ensure there is only one call processed at a time (currentRefresh)
    if (!this.currentRefresh) {
      this.currentRefresh = new Promise((resolve, reject) => {
        if (this._user) {
          this.keycloak.updateToken(5)
            .success(() => {
              this.initUser();
              resolve(this.user);
              this.currentRefresh = undefined;
            })
            .error(() => {
              this.currentRefresh = undefined;
              this.logout();
              reject('Failed to refresh token');
            });
        } else {
          this.currentRefresh = undefined;
          reject('User is not authenticated');
        }
      });
    }
    return this.currentRefresh;
  };

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    if (!this.user) {
      throw new Error('User is not authenticated');
    }
    if (!provider) {
      return 'https://manage.openshift.com/';
    }
    if (this.user.accountLink[provider]) {
      return this.user.accountLink[provider];
    }
    const nonce = uuidv4();
    const clientId = checkNotNull(this.config.clientId, 'clientId');
    const hash = nonce + this.user.sessionState
      + clientId + provider;
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(hash);
    const hashed = KeycloakAuthenticationApi.base64ToUri(shaObj.getHash('B64'));
    // tslint:disable-next-line
    const link = `${this.keycloak.authServerUrl}/realms/${this.config.realm}/broker/${provider}/link?nonce=${encodeURI(nonce)}&hash=${hashed}&client_id=${encodeURI(clientId)}&redirect_uri=${encodeURI(redirect || location.href)}`;
    this.user.accountLink[provider] = link;
    return link;
  };

  private initUser() {
    if (!this.keycloak) {
      this._user = {
        userName: 'Anonymous',
        userPreferredName: 'Anonymous',
        token: 'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo',
        sessionState: 'sessionState',
        accountLink: {},
      };
      this.triggerUserChange();
      return;
    }
    if (this.keycloak.token) {
      KeycloakAuthenticationApi.setStoredData({
        token: this.keycloak.token,
        refreshToken: this.keycloak.refreshToken,
        idToken: this.keycloak.idToken,
      });
      this._user = {
        userName: _.get(this.keycloak, 'tokenParsed.name'),
        userPreferredName: _.get(this.keycloak, 'tokenParsed.preferred_username'),
        token: this.keycloak.token,
        sessionState: _.get(this.keycloak, 'tokenParsed.session_state'),
        accountLink: {},
      };
      this.triggerUserChange();
    }
  }

  public get enabled(): boolean {
    return true;
  }

  private triggerUserChange() {
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
  }

  private static clearStoredData() {
    sessionStorage.clear();
    localStorage.removeItem('kc');
  }

  private static setStoredData(data: StoredData) {
    localStorage.setItem('kc', JSON.stringify(data));
  }

  private static getStoredData(): StoredData | undefined {
    const item = localStorage.getItem('kc');
    return item && JSON.parse(item);
  }
}
