import { Injectable } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import * as jsSHA from 'jssha';
import { Config } from 'ngx-launcher';
import * as Keycloak from '../../assets/keycloak/keycloak.js';

export class Auth {
  public authz?: {
    authServerUrl?: string;
    tokenParsed?: {
      session_state: string;
      name: string;
      preferred_username: string;
    };
    token?: string;
    updateToken?: any;
    login?: any;
  };
  public logoutUrl?: string;
}

@Injectable()
export class KeycloakService {
  public auth: Auth = {};
  public accountLink: Map<string, string> = new Map<string, string>();
  private skip: boolean;
  private readonly config: {
    url: string;
    realm: string;
    clientId: string;
  };

  constructor(config: Config) {
    this.config = {
      url: config.get('keycloak_url'),
      realm: config.get('keycloak_realm'),
      clientId: config.get('keycloak_client_id'),
    };
  }

  public init(): Promise<KeycloakService> {
    return new Promise<KeycloakService>((resolve, reject) => {
      this.skip = !this.config.realm;
      this.auth.authz = {};
      if (!this.skip) {
        const keycloakAuth: any = Keycloak(this.config);
        keycloakAuth.init({ onLoad: 'check-sso', checkLoginIframe: false })
          .error(() => reject())
          .success(() => {
            this.auth.authz = keycloakAuth;
            // tslint:disable-next-line
            this.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${this.config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
            const identify = window['analytics'] && window['analytics']['identify'];
            if (identify && keycloakAuth.authenticated) {
              identify(keycloakAuth.tokenParsed.email, keycloakAuth.tokenParsed);
            }
            resolve(this);
          });
      } else {
        resolve(this);
      }
    });
  }

  public logout() {
    if (this.skip) {
      return;
    }
    this.auth.authz = null;
    this.accountLink = new Map<string, string>();
    window.location.href = this.auth.logoutUrl;
  }

  public login(redirectUri?: string) {
    if (this.skip) {
      return;
    }
    this.auth.authz.login({ redirectUri });
  }

  public isAuthenticated(): boolean {
    if (this.skip) {
      return true;
    }
    return Boolean(this.auth.authz.tokenParsed);
  }

  public linkAccount(provider: string, redirect?: string): string {
    if (this.skip) {
      return null;
    }
    const authz = this.auth.authz;
    if (this.accountLink.has(provider)) {
      return this.accountLink.get(provider);
    } else if (authz.tokenParsed) {
      const nonce = uuidv4();
      const clientId = this.config.clientId;
      const hash = nonce + this.auth.authz.tokenParsed.session_state
        + clientId + provider;
      const shaObj = new jsSHA('SHA-256', 'TEXT');
      shaObj.update(hash);
      const hashed = KeycloakService.base64ToUri(shaObj.getHash('B64'));
      // tslint:disable-next-line
      const link = `${this.auth.authz.authServerUrl}/realms/${this.config.realm}/broker/${provider}/link?nonce=${encodeURI(nonce)}&hash=${hashed}&client_id=${encodeURI(clientId)}&redirect_uri=${encodeURI(redirect || location.href)}`;
      this.accountLink.set(provider, link);
      return link;
    }
    return '';
  }

  get user(): string {
    return this.skip ? '' : this.auth.authz.tokenParsed.name;
  }

  public username(): string {
    return this.skip ? '' : this.auth.authz.tokenParsed.preferred_username;
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.auth.authz.token) {
        this.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(this.auth.authz.token);
          })
          .error(() => {
            this.auth.authz = {};
            reject('Failed to refresh token');
          });
      } else {
        resolve('eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo');
      }
    });
  }

  private static base64ToUri(b64: string): string {
    return b64.replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
