import { Injectable } from "@angular/core";

import { v4 } from "uuid";
import * as jsSHA from "jssha";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

const config = require("../../assets/keycloak/keycloak.json");
let Keycloak = require("../../assets/keycloak/keycloak.js");

@Injectable()
export class KeycloakService {
  private skip: boolean;
  auth: any = {};
  loginSubject: Subject<string> = new Subject<string>();
  accountLink: Map<string, string> = new Map<string, string>();

  init(): Promise<KeycloakService> {
    return new Promise<KeycloakService>((resolve, reject) => {
      this.skip = !config.realm;
      const keycloakAuth: any = Keycloak(config);

      this.auth.authz = {};

      if (config.realm) {
        keycloakAuth.init({ onLoad: "check-sso", checkLoginIframe: false })
          .error(() => reject())
          .success(() => {
            this.auth.authz = keycloakAuth;
            this.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
            this.loginSubject.next(keycloakAuth.token);
            if (window['analytics'] && keycloakAuth.authenticated) {
              window['analytics'].identify(keycloakAuth.tokenParsed.email, keycloakAuth.tokenParsed);
            }
            resolve(this);
          });
      } else {
        resolve(this);
      }
    });
  }

  logout() {
    this.auth.authz = null;
    this.accountLink = new Map<string, string>();
    window.location.href = this.auth.logoutUrl;
  }

  login(redirectUri?: string) {
    this.auth.authz.login({redirectUri: redirectUri});
  }

  get onLogin(): Observable<string> {
    if (this.auth.authz.tokenParsed) {
      return Observable.of(this.auth.authz.token);
    }
    return this.loginSubject.asObservable();
  }

  isAuthenticated(): boolean {
    if (this.skip) {
      return true;
    }
    return this.auth.authz.tokenParsed;
  }

  linkAccount(provider: string, redirect?: string): string {
    if (this.accountLink.has(provider)) {
      return this.accountLink.get(provider);
    } else if (this.auth.authz.tokenParsed) {
      const nonce = v4();
      const clientId = config.clientId;
      const hash = nonce + this.auth.authz.tokenParsed.session_state
        + clientId + provider;
      const shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(hash);
      let hashed = shaObj.getHash("B64");

      let link = `${this.auth.authz.authServerUrl}/realms/${config.realm}/broker/${provider}/link?nonce=`
        + `${encodeURI(nonce)}&hash=${hashed}&client_id=${encodeURI(clientId)}&redirect_uri=${encodeURI(redirect || location.href)}`;
      this.accountLink.set(provider, link);
      return link;
    }
    return '';
  }

  get user(): string {
    return this.skip ? "" : this.auth.authz.tokenParsed.name;
  }

  username(): string {
    return this.skip ? "" : this.auth.authz.tokenParsed.preferred_username;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.auth.authz.token) {
        this.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>this.auth.authz.token);
          })
          .error(() => {
            reject("Failed to refresh token");
          });
      } else {
        resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o");
      }
    });
  }
}
