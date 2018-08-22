import * as KeycloakCore from '../../assets/keycloak/keycloak.js';
import { Config } from 'ngx-launcher';
import { AuthService, User } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import * as jsSHA from 'jssha';
import * as _ from 'lodash';

export class KeycloakAuthService extends AuthService {

  private logoutUrl?: string;
  private readonly clientId?: string;
  private readonly realm?: string;
  private readonly url?: string;
  private readonly keycloak?: any;

  constructor(config: Config, keycloakCoreFactory = KeycloakCore, private doRedirect = (url) => window.location.href = url ) {
    super();
    this.realm = config.get('keycloak_realm');
    if (this.realm) {
      this.url = config.get('keycloak_url');
      this.clientId = config.get('keycloak_client_id');
      this.keycloak = keycloakCoreFactory({ url: this.url, realm: this.realm, clientId: this.clientId });
    }
  }

  public init(): Promise<AuthService> {
    return new Promise<AuthService>((resolve, reject) => {
      if (!this.keycloak) {
        resolve(this);
      }
      this.keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })
        .error(() => reject())
        .success(() => {
          this.initUser();
          // tslint:disable-next-line
          this.logoutUrl = `${this.keycloak.authServerUrl}/realms/${this.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;

          resolve(this);
        });
    });
  }

  public login(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (!this.keycloak) {
        return resolve(null);
      }
      this.keycloak.login()
        .success(() => {
          this.initUser();
          resolve(this.user);
        })
        .error(() => {
          reject(new Error('Failed to login'));
        });
    });
  }

  public logout() {
    super.logout();
    if (this.keycloak) {
      this.keycloak.clearToken();
      if (!this.logoutUrl) {
        throw new Error('Logout url must be set in order to logout.');
      }
      this.doRedirect(this.logoutUrl);
    }
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.keycloak) {
        if (this.isAuthenticated()) {
          this.keycloak.updateToken(5)
            .success(() => {
              resolve(this.user.token);
            })
            .error(() => {
              this.logout();
              reject('Failed to refresh token');
            });
        } else {
          reject('User is not authenticated');
        }
      } else {
        resolve('eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo');
      }
    });
  }

  public isEnabled(): boolean {
    return Boolean(this.keycloak);
  }

  public linkAccount(provider: string, redirect?: string): string {
    if (!this.isAuthenticated()) {
      return null;
    }
    if (this.user.accountLink[provider]) {
      return this.user.accountLink[provider];
    }
    const nonce = uuidv4();
    const clientId = this.clientId;
    const hash = nonce + this.user.sessionState
      + clientId + provider;
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(hash);
    const hashed = KeycloakAuthService.base64ToUri(shaObj.getHash('B64'));
    // tslint:disable-next-line
    const link = `${this.keycloak.authServerUrl}/realms/${this.realm}/broker/${provider}/link?nonce=${encodeURI(nonce)}&hash=${hashed}&client_id=${encodeURI(clientId)}&redirect_uri=${encodeURI(redirect || location.href)}`;
    this.user.accountLink[provider] = link;
    return link;
  }

  private initUser() {
    if (this.keycloak.token) {
      this._user = {
        name: _.get(this.keycloak, 'tokenParsed.name'),
        preferredName: _.get(this.keycloak, 'tokenParsed.preferred_username'),
        token: this.keycloak.token,
        sessionState: _.get(this.keycloak, 'tokenParsed.session_state'),
        accountLink: {},
      };
      const identify = window['analytics'] && window['analytics']['identify'];
      if (identify && this.keycloak.authenticated) {
        identify(this.keycloak.tokenParsed.email, this.keycloak.tokenParsed);
      }
    }
  }

  private static base64ToUri(b64: string): string {
    return b64.replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
