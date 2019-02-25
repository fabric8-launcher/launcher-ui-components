import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, createMockAuthApi, useAuthApi, useStateOnAuthApi } from 'keycloak-react';

function HomePage() {
  const auth = useAuthApi();
  return (
    <h1>hello {auth.user!.userName}</h1>
  );
}

export function LauncherApp() {
  const auth = useStateOnAuthApi(createMockAuthApi());
  return (
    <AuthContext.Provider value={auth}>
      <AuthRouter loginPage={LoginPage} homePage={HomePage}/>
    </AuthContext.Provider>
  );
}
