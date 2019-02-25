import { AuthenticationApi, OptionalUser, User } from '../AuthenticationApi';

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

  public linkAccount = (provider: string, redirect?: string): string | undefined => {
    throw new Error('linkAccount should not be called in No Authentication mode');
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
