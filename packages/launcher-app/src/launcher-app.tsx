import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, newAuthApi, useStateOnAuthApi } from 'keycloak-react';
import { Launcher, LauncherClientProvider } from 'launcher-component';
import { Layout } from './layout';
import { PageSection } from '@patternfly/react-core';
import { authenticationMode, creatorApiUrl, keycloakConfig, launcherApiUrl } from './config';

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
  const auth = useStateOnAuthApi(newAuthApi(authenticationMode, keycloakConfig));
  return (
    <AuthContext.Provider value={auth}>
      <LauncherClientProvider authorizationToken={auth.user && auth.user.token} creatorUrl={creatorApiUrl} launcherUrl={launcherApiUrl}>
        <AuthRouter loginPage={LoginPage} homePage={HomePage}/>
      </LauncherClientProvider>
    </AuthContext.Provider>
  );
}
