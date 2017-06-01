import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";

const config = require("../../assets/keycloak/keycloak.json");
let Keycloak = require("../../assets/keycloak/keycloak.js");

@Injectable()
export class KeycloakService {
  private skip: boolean;
  auth: any = {};
  subject: Subject<string> = new Subject<string>();

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
            this.subject.next(keycloakAuth.token);
            this.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
          })
      }
  }

  logout() {
    this.auth.loggedIn = false;
    this.auth.authz = null;
    window.location.href = this.auth.logoutUrl;
  }

  login() {
    this.auth.authz.login()
  }

  get onLogin(): Observable<string> {
    return this.subject;
  }

  isAuthenticated(): boolean {
    if (this.skip) {
      return true;
    }
    return this.auth.authz.tokenParsed;
  }

  get user(): string {
    return this.skip ? "Fake User" : this.auth.authz.tokenParsed.name;
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
        resolve("");
      }
    });
  }
}