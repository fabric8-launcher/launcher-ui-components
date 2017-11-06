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

  constructor() {
    this.skip = !config.realm;
    const keycloakAuth: any = Keycloak(config);

    this.auth.loggedIn = false;
    this.auth.authz = {};

    if (config.realm) {
      keycloakAuth.init({ onLoad: "check-sso", checkLoginIframe: false })
        .success(() => {
          this.auth.loggedIn = true;
          this.auth.authz = keycloakAuth;
          this.loginSubject.next(keycloakAuth.token);
          this.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
        });
    }
  }

  logout() {
    this.auth.loggedIn = false;
    this.auth.authz = null;
    this.accountLink = new Map<string, string>();
    window.location.href = this.auth.logoutUrl;
  }

  login() {
    this.auth.authz.login();
  }

  get onLogin(): Observable<string> {
    if (this.auth.authz.tokenParsed) {
      return Observable.of(this.auth.authz.tokenParsed);
    }
    return this.loginSubject;
  }

  isAuthenticated(): boolean {
    if (this.skip) {
      return true;
    }
    return this.auth.authz.tokenParsed;
  }

  linkAccount(provider: string): string {
    if (this.accountLink.has(provider)) {
      return this.accountLink.get(provider);
    } else {
      const nonce = v4();
      const hash = nonce + this.auth.authz.tokenParsed.session_state
        + config.clientId + provider;
      const shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(hash);
      let hashed = shaObj.getHash("B64");
      const redirect = location.href;

      let link = `${this.auth.authz.authServerUrl}/realms/${config.realm}/broker/${provider}/link`
        + `?nonce=${nonce}&hash=${hashed}&client_id=${config.realm}&redirect_uri=${redirect}`;
      this.accountLink.set(provider, link);
      return link;
    }
  }

  get user(): string {
    return this.skip ? "Fake User" : this.auth.authz.tokenParsed.name;
  }

  username() : string {
    return this.skip ? "anonymous" : this.auth.authz.tokenParsed.preferred_username;
  }

  getToken(): string {
    if (this.auth.authz.token) {
      this.auth.authz
        .updateToken(5)
        .success(() => {
          return <string>this.auth.authz.token;
        })
        .error(() => {
          throw new Error("Failed to refresh token");
        });
    } else {
      return "";
    }
  }
}