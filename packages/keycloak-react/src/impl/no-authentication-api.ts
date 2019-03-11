import { AuthenticationApi, OptionalUser, User } from '../authentication-api';

const anonymousUser: User = {
  userName: 'Anonymous',
  userPreferredName: 'Anonymous',
  token: 'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo',
  sessionState: 'sessionState',
  accountLink: {},
};

export default class NoAuthenticationApi implements AuthenticationApi {
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;

  public setOnUserChangeListener(listener: (user: OptionalUser) => void) {
    this.onUserChangeListener = listener;
  }

  public init(): Promise<OptionalUser> {
    this.triggerUserChange();
    return Promise.resolve(anonymousUser);
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    return `http://authorize/${provider}`;
  };

  public login = (): void => {
    throw new Error('login should not be called in No Authentication mode');
  };

  public logout = (): void => {
    throw new Error('logout should not be called in No Authentication mode');
  };

  public openAccountManagement = (): void => {
    throw new Error('openAccountManagement should not be called in No Authentication mode');
  };

  public refreshToken = (): Promise<OptionalUser> => {
    if (this.onUserChangeListener) {
      this.onUserChangeListener(anonymousUser);
    }
    return Promise.resolve(anonymousUser);
  };

  public get user() {
    return anonymousUser;
  }

  public get enabled(): boolean {
    return false;
  }

  private triggerUserChange() {
    if (this.onUserChangeListener) {
      this.onUserChangeListener(anonymousUser);
    }
  }
}
