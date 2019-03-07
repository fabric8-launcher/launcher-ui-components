import { AuthenticationApi, OptionalUser } from '../authentication-api';
import { KeycloakAuthenticationApi } from './keycloak-authentication-api';

export default class AuthenticationApiReactStateProxy implements AuthenticationApi {

  constructor(private readonly authApi: AuthenticationApi, private _user: OptionalUser, private setUser: (OptionalUser) => void) {
  }

  public async init(): Promise<OptionalUser> {
    if(this.authApi instanceof KeycloakAuthenticationApi) {
      (this.authApi as KeycloakAuthenticationApi).setOnUserChangeListener((changed) => this.setUser(changed));
    }
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

}
