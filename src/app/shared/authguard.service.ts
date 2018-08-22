import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) {
  }

  public canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      return false;
    }
    return true;
  }
}
