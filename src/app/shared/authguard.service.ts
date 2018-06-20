import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private keycloak: KeycloakService) {
  }

  public canActivate(): boolean {
    if (!this.keycloak.isAuthenticated()) {
      this.keycloak.login();
      return false;
    }
    return true;
  }
}
