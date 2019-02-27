import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, newAuthApi, useStateOnAuthApi } from 'keycloak-react';
import { DataLoader, Launcher, LauncherClientProvider } from 'launcher-component';
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
  const authApi = useStateOnAuthApi(newAuthApi(authenticationMode, keycloakConfig));
  const authLoader = () => {
    return authApi.init();
  };
  return (
    <DataLoader loader={authLoader} default={undefined}>
      <AuthContext.Provider value={authApi}>
        <LauncherClientProvider
          authorizationToken={authApi.user && authApi.user.token}
          creatorUrl={creatorApiUrl}
          launcherUrl={launcherApiUrl}
        >
          <AuthRouter loginPage={LoginPage} homePage={HomePage}/>
        </LauncherClientProvider>
      </AuthContext.Provider>
    </DataLoader>
  );
}
