import * as React from 'react';
import { useContext, useState } from 'react';
import { AuthenticationApi, OptionalUser } from './AuthenticationApi';
import NoAuthenticationApi from './impl/NoAuthenticationApi';

export const AuthContext = React.createContext<AuthenticationApi>(new NoAuthenticationApi());

export default class AuthenticationApiWithState implements AuthenticationApi {

  constructor(private readonly authApi: AuthenticationApi, private _user: OptionalUser, private setUser: (OptionalUser) => void) {
  }

  public async init(): Promise<OptionalUser> {
    const user = await this.authApi.init();
    this.setUser(user);
    return user;
  }

  public linkAccount = (provider: string, redirect?: string): string | undefined => {
    return this.authApi.linkAccount(provider, redirect);
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

export function useStateOnAuthApi(authApi: AuthenticationApi): AuthenticationApi {
  const [user, setUser] = useState<OptionalUser>(undefined);
  return new AuthenticationApiWithState(authApi, user, setUser);
}

export function useAuthApi(): AuthenticationApi {
  return useContext(AuthContext);
}
