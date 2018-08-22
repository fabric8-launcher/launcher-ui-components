
export class User {
  token: string;
  accountLink: Map<string, string>;
  name: string;
  sessionState: string;
  preferredName: string;
}

export abstract class AuthService {
  protected _user?: User;
  abstract init(): Promise<AuthService>;
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