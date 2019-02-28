import { AuthenticationApi, OptionalUser } from '../authentication-api';

export default class AuthenticationApiReactStateProxy implements AuthenticationApi {

  constructor(private readonly authApi: AuthenticationApi, private _user: OptionalUser, private setUser: (OptionalUser) => void) {
  }

  public async init(): Promise<OptionalUser> {
    const user = await this.authApi.init();
    this.setUser(user);
    return user;
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    return this.authApi.generateAuthorizationLink(provider, redirect);
  };

  public login = (): void => {
    this.authApi.login();
    this.setUser(this.authApi.user);
  };

  public logout = (): void => {
    this.authApi.logout();
    this.setUser(this.authApi.user);
  };

  public openAccountManagement = (): void => {
    this.authApi.openAccountManagement();
  };

  public refreshToken = async (): Promise<OptionalUser> => {
    const user = await this.authApi.refreshToken();
    this.setUser(user);
    return user;
  };

  public get user() {
    return this._user;
  }

  public get enabled(): boolean {
    return this.authApi.enabled;
  }

}
