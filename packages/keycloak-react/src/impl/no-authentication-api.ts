import { AuthenticationApi, OptionalUser, User } from '../authentication-api';

const anonymousUser: User = {
  userName: 'Anonymous',
  userPreferredName: 'Anonymous',
  token: 'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo',
  sessionState: 'sessionState',
  accountLink: {},
};

export default class NoAuthenticationApi implements AuthenticationApi {

  public init(): Promise<OptionalUser> {
    return Promise.resolve(anonymousUser);
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    return `http://authorize/${provider}`;
  }

  public login= (): void => {
    throw new Error('login should not be called in No Authentication mode');
  }

  public logout = (): void => {
    throw new Error('logout should not be called in No Authentication mode');
  }

  public openAccountManagement = (): void => {
    throw new Error('openAccountManagement should not be called in No Authentication mode');
  }

  public refreshToken = (): Promise<OptionalUser> => {
    return Promise.resolve(anonymousUser);
  }

  public get user() {
    return anonymousUser;
  }

  public get enabled(): boolean {
    return false;
  }
}
