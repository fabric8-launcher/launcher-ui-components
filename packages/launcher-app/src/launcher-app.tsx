import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, createMockAuthApi, useAuthApi, useStateOnAuthApi } from 'keycloak-react';
import { Launcher, LauncherClientProvider } from 'launcher-component';

function HomePage() {
  const auth = useAuthApi();
  return (
    <React.Fragment>
      <h1>hello {auth.user!.userName}</h1>
      <Launcher/>
    </React.Fragment>
  );
}

export function LauncherApp() {
  const auth = useStateOnAuthApi(createMockAuthApi());
  return (
    <AuthContext.Provider value={auth}>
      <LauncherClientProvider authorizationToken={auth.user && auth.user.token}>
        <AuthRouter loginPage={LoginPage} homePage={HomePage}/>
      </LauncherClientProvider>
    </AuthContext.Provider>
  );
}
