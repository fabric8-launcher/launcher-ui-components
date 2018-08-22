import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private keycloakService: KeycloakService) {
  }

  public canActivate(): boolean {
    if (!this.keycloakService.isAuthenticated()) {
      this.keycloakService.login();
      return false;
    }
    return true;
  }
}
