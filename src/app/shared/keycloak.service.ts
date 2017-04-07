import { Injectable } from '@angular/core';
import { Config } from "./config.component";

const config = require('../../assets/keycloak/keycloak.json');
let Keycloak = require('../../assets/keycloak/keycloak.js');

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
        keycloakAuth.init({ onLoad: 'check-sso' })
          .success(() => {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
              + '/realms/' + config.realm + '/protocol/openid-connect/logout?redirect_uri='
              + document.baseURI;
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

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        resolve(this.skip ? "dummy": "");
      }
    });
  }
}