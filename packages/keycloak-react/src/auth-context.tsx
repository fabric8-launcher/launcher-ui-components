import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationApi, OptionalUser } from './authentication-api';
import NoAuthenticationApi from './impl/no-authentication-api';
import AuthenticationApiReactStateProxy from './impl/authentication-api-react-state-proxy';

export const AuthContext = React.createContext<AuthenticationApi>(new NoAuthenticationApi());

export function useAuthenticationApiStateProxy(authApi: AuthenticationApi): AuthenticationApi {
  const [user, setUser] = useState<OptionalUser>(undefined);
  const [proxyAuthApi, setProxyAuthApi] = useState<AuthenticationApi>(new AuthenticationApiReactStateProxy(authApi, user, setUser));
  useEffect(() => {
    setProxyAuthApi(new AuthenticationApiReactStateProxy(authApi, user, setUser));
  }, [user]);
  return proxyAuthApi;
}

export function useAuthApi(): AuthenticationApi {
  return useContext(AuthContext);
}
