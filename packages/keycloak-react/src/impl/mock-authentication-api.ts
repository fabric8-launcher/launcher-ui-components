import { AuthenticationApi, OptionalUser, User } from '../authentication-api';

const mockUser: User = {
  userName: 'Anonymous',
  userPreferredName: 'Anonymous',
  token: 'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo',
  sessionState: 'sessionState',
  accountLink: {},
};

export default class MockAuthenticationApi implements AuthenticationApi {
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;
  private _user: OptionalUser;

  public setOnUserChangeListener(listener: (user: OptionalUser) => void) {
    this.onUserChangeListener = listener;
  }

  public init = (): Promise<OptionalUser> => {
    if (JSON.parse(sessionStorage.getItem('mock-auth') || 'false')) {
      this.login();
    }
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
    return Promise.resolve(this._user);
  };

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    return `https://authorize/${provider}`;
  };

  public login = (): void => {
    this._user = mockUser;
    sessionStorage.setItem('mock-auth', JSON.stringify(true));
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
  };

  public logout = (): void => {
    this._user = undefined;
    sessionStorage.setItem('mock-auth', JSON.stringify(false));
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
  };

  public openAccountManagement = (): void => {
    // alert('Account management is not available on mock mode.');
  };

  public refreshToken = (): Promise<OptionalUser> => {
    this.triggerUserChange();
    return Promise.resolve(this._user);
  };

  public get user() {
    return this._user;
  }

  public get enabled(): boolean {
    return true;
  }

  private triggerUserChange() {
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
  }
}
