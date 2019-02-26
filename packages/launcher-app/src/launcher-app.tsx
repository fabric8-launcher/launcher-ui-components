import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, createMockAuthApi, useStateOnAuthApi } from 'keycloak-react';
import { Launcher, LauncherClientProvider } from 'launcher-component';
import { Layout } from './layout';
import { PageSection } from '@patternfly/react-core';

function HomePage() {
  return (
    <Layout>
      <PageSection variant="light">
      <Launcher/>
      </PageSection>
    </Layout>
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
