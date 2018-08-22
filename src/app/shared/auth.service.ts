export class User {
  public token: string;
  public accountLink: object;
  public name: string;
  public sessionState: string;
  public preferredName: string;
}

export abstract class AuthService {
  protected _user?: User;

  public abstract init(): Promise<AuthService>;

  public abstract login(): Promise<User>;

  public abstract isEnabled(): boolean;

  public abstract getToken(): Promise<string>;

  public abstract linkAccount(provider: string, redirect?: string): string;

  get user(): User {
    return this._user;
  }

  public logout() {
    this.clearUser();
  }

  public isAuthenticated(): boolean {
    if (!this.isEnabled()) {
      return true;
    }
    return Boolean(this.user);
  }

  protected clearUser() {
    this._user = null;
  }
}
