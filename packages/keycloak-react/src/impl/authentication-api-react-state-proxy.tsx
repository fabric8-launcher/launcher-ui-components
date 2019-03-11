import { AuthenticationApi, OptionalUser } from '../authentication-api';

export default class AuthenticationApiReactStateProxy implements AuthenticationApi {

  constructor(private readonly authApi: AuthenticationApi, private _user: OptionalUser, private setUser: (OptionalUser) => void) {
  }

  public async init(): Promise<OptionalUser> {
    this.authApi.setOnUserChangeListener((changed) => this.setUser(changed));
    return await this.authApi.init();
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    return this.authApi.generateAuthorizationLink(provider, redirect);
  };

  public login = (): void => {
    this.authApi.login();
  };

  public logout = (): void => {
    this.authApi.logout();
  };

  public openAccountManagement = (): void => {
    this.authApi.openAccountManagement();
  };

  public refreshToken = async (): Promise<OptionalUser> => {
    return await this.authApi.refreshToken();
  };

  public get user() {
    return this._user;
  }

  public get enabled(): boolean {
    return this.authApi.enabled;
  }

  public setOnUserChangeListener(listener: (user: OptionalUser) => void) {
    throw new Error('setOnUserChangeListener should not be called on the proxy');
  }

}
