import { Injectable } from "@angular/core";

import { v4 } from "uuid";
import * as jsSHA from "jssha";
const config = require("../../assets/keycloak/keycloak.json");
let Keycloak = require("../../assets/keycloak/keycloak.js");

@Injectable()
export class KeycloakService {
  private skip: boolean;
  static auth: any = {};

  constructor() {
    this.skip = !config.realm;
  }

  static init(): Promise<any> {
    const keycloakAuth: any = Keycloak(config);

    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = {};

    if (config.realm) {
      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: "check-sso", checkLoginIframe: false })
          .success(() => {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${config.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
            resolve();
          })
          .error(() => {
            reject();
          });
      });
    }
    return Promise.resolve();
  }

  logout() {
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    window.location.href = KeycloakService.auth.logoutUrl;
  }

  login() {
    KeycloakService.auth.authz.login();
  }

  isAuthenticated(): boolean {
    if (this.skip) {
      return true;
    }
    return KeycloakService.auth.authz.tokenParsed;
  }

  linkAccount() {
    const nonce = v4();
    const provider = 'github';
    const hash = nonce + KeycloakService.auth.authz.tokenParsed.session_state
      + KeycloakService.auth.authz.tokenParsed.client_session + provider;
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(hash);
    let hashed = shaObj.getHash("B64");
    const redirect = location.href;

    location.href = `${KeycloakService.auth.authz.authServerUrl}/realms/${config.realm}/broker/${provider}/link`
      + `?nonce=${nonce}&hash=${hashed}&client_id=${config.realm}&redirect_uri=${redirect}`
  }

  get user(): string {
    return this.skip ? "Fake User" : KeycloakService.auth.authz.tokenParsed.name;
  }

  username() : string {
    return this.skip ? "anonymous" : KeycloakService.auth.authz.tokenParsed.preferred_username;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
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