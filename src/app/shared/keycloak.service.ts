
export class User {
  token: string;
  accountLink: Map<string, string>;
  name: string;
  sessionState: string;
  preferredName: string;
}

export abstract class KeycloakService {
  protected logoutUrl?: string;
  protected authServerUrl?: string;
  protected clientId?: string;
  protected realm?: string;
  protected url?: string;
  protected _user?: User;
  abstract init(): Promise<KeycloakService>;
  abstract login();
  abstract isEnabled(): boolean;
  abstract getToken(): Promise<string>;
  abstract linkAccount(provider: string, redirect?: string): string;

  get user(): User {
    return this._user;
  }

  public logout() {
    this.clearUser();
  }


  public isAuthenticated(): boolean {
    return Boolean(this.user);
  }

  protected clearUser() {
    this._user = null;
  }
}