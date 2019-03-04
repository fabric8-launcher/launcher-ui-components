import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import { AuthContext, AuthRouter, newAuthApi, useAuthenticationApiStateProxy } from 'keycloak-react';
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

const authApi = newAuthApi(authenticationMode, keycloakConfig);

export function LauncherApp() {
  const proxyAuthApi = useAuthenticationApiStateProxy(authApi);
  const authLoader = () => {
    return proxyAuthApi.init();
  };
  const authorizationTokenProvider = async () => {
    if(!proxyAuthApi.user) {
      return undefined;
    }
    const user = await proxyAuthApi.refreshToken();
    return user && user.token;
  };
  return (
    <DataLoader loader={authLoader}>
      <AuthContext.Provider value={proxyAuthApi}>
        <LauncherClientProvider
          authorizationTokenProvider={authorizationTokenProvider}
          creatorUrl={creatorApiUrl}
          launcherUrl={launcherApiUrl}
        >
          <AuthRouter loginPage={LoginPage} homePage={HomePage} basename={process.env.PUBLIC_URL}/>
        </LauncherClientProvider>
      </AuthContext.Provider>
    </DataLoader>
  );
}
