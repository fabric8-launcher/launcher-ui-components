import { Injectable } from "@angular/core";

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

  get user(): string {
    return this.skip ? "Fake User" : KeycloakService.auth.authz.tokenParsed.name;
  }

  username() : string {
    return this.skip ? "anonymous" : KeycloakService.auth.authz.tokenParsed.preferred_username;
  }

  getToken(): string {
    if (KeycloakService.auth.authz.token) {
      KeycloakService.auth.authz
        .updateToken(5)
        .success(() => {
          return <string>KeycloakService.auth.authz.token;
        })
        .error(() => {
          throw new Error("Failed to refresh token");
        });
    } else {
      return "";
    }
  }
}