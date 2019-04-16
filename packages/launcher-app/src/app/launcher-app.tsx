import React, { useEffect } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { LoginPage } from './login-page';
import {
  CreateNewAppFlow,
  DataLoader,
  DeployExampleAppFlow,
  ImportExistingFlow,
  LauncherClientProvider,
  LauncherMenu,
} from 'launcher-component';
import { Layout } from './layout';
import { authenticationMode, creatorApiUrl, keycloakConfig, launcherApiUrl, publicUrl } from '../config';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext, AuthRouter, newAuthApi, useAuthenticationApiStateProxy } from 'keycloak-react';
import { useRouter, createRouterLink, restoreRouterHistory } from './use-router';

function Routes(props: {}) {
  const router = useRouter();
  useEffect(() => {
    restoreRouterHistory(router);
  }, []);
  const Menu = () => {
    return (
      <LauncherMenu
        createNewApp={createRouterLink(router, '/flow/new-app')}
        createExampleApp={createRouterLink(router, '/flow/deploy-example-app')}
        importExistingApp={createRouterLink(router, '/flow/import-existing-app')}
      />
    );
  };
  const WithCancel = (cancelProps: { children: (onCancel: () => void) => any }) => {
    const rootLink = createRouterLink(router, '/');
    return cancelProps.children(rootLink.onClick);
  };
  const CreateNewAppFlowRoute = () => (<WithCancel>{onCancel => <CreateNewAppFlow onCancel={onCancel} />}</WithCancel>);
  const ImportExistingFlowRoute = () => (<WithCancel>{onCancel => <ImportExistingFlow onCancel={onCancel} />}</WithCancel>);
  const DeployExampleAppFlowRoute = () => (<WithCancel>{onCancel => <DeployExampleAppFlow onCancel={onCancel} />}</WithCancel>);
  return (
    <Switch>
      <Route path="/home" exact component={Menu} />
      <Route path="/flow/new-app" exact component={CreateNewAppFlowRoute} />
      <Route path="/flow/import-existing-app" exact component={ImportExistingFlowRoute} />
      <Route path="/flow/deploy-example-app" exact component={DeployExampleAppFlowRoute} />
      <Redirect to="/home" />
    </Switch>
  );
}

function HomePage(props: {}) {
  return (
    <BrowserRouter basename={publicUrl}>
      <Layout>
        <div className="launcher-container">
          <Routes />
        </div>
      </Layout>
    </BrowserRouter>
  );
}

const authApi = newAuthApi(authenticationMode, keycloakConfig);

export function LauncherApp() {
  const proxyAuthApi = useAuthenticationApiStateProxy(authApi);
  const authLoader = () => {
    return proxyAuthApi.init().catch(e => console.error(e));
  };
  const authorizationTokenProvider = async () => {
    return proxyAuthApi.user && proxyAuthApi.user.token;
  };
  return (
    <DataLoader loader={authLoader}>
      <AuthContext.Provider value={proxyAuthApi}>
        <LauncherClientProvider
          authorizationTokenProvider={authorizationTokenProvider}
          creatorUrl={creatorApiUrl}
          launcherUrl={launcherApiUrl}
        >
          <AuthRouter loginPage={LoginPage} basename={publicUrl}>
            <HomePage />
          </AuthRouter>
        </LauncherClientProvider>
      </AuthContext.Provider>
    </DataLoader>
  );
}
