import React, { BaseSyntheticEvent } from 'react';
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
import { authenticationMode, creatorApiUrl, keycloakConfig, launcherApiUrl, publicUrl } from './config';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useRouter } from './use-router';
import { createLocation } from 'history';
import { AuthContext, AuthRouter, newAuthApi, useAuthenticationApiStateProxy } from 'keycloak-react';

function HomePage(props: {}) {
  const useCreateLink = (to: string) => {
    const router = useRouter();
    const href = router.history.createHref(createLocation(to, undefined, undefined, router.location));
    return {
      href,
      onClick: (e?: BaseSyntheticEvent) => {
        if(e) {
          e.preventDefault();
        }
        router.history.push(href);
      }
    };
  };
  const Menu = () => {
    return (
      <LauncherMenu
        createNewApp={useCreateLink('/flow/new-app')}
        createExampleApp={useCreateLink('/flow/import-existing-app')}
        importExistingApp={useCreateLink('/flow/deploy-example-app')}
      />
    );
  };
  const WithCancel = (cancelProps: { children: (onCancel: () => void) => any}) => {
    const rootLink = useCreateLink('/');
    return cancelProps.children(rootLink.onClick);
  };
  const CreateNewAppFlowRoute = () => (<WithCancel>{onCancel => <CreateNewAppFlow onCancel={onCancel}/>}</WithCancel>);
  const ImportExistingFlowRoute = () => (<WithCancel>{onCancel => <ImportExistingFlow onCancel={onCancel}/>}</WithCancel>);
  const DeployExampleAppFlowRoute = () => (<WithCancel>{onCancel => <DeployExampleAppFlow onCancel={onCancel}/>}</WithCancel>);

  return (
    <Layout>
      <div className="launcher-container">
        <BrowserRouter basename={publicUrl}>
          <Switch>
            <Route path="/home" exact component={Menu}/>
            <Route path="/flow/new-app" exact component={CreateNewAppFlowRoute}/>
            <Route path="/flow/import-existing-app" exact component={ImportExistingFlowRoute}/>
            <Route path="/flow/deploy-example-app" exact component={DeployExampleAppFlowRoute}/>
            <Redirect to="/home"/>
          </Switch>
        </BrowserRouter>
      </div>
    </Layout>
  );
}

const authApi = newAuthApi(authenticationMode, keycloakConfig);

export function LauncherApp() {
  const proxyAuthApi = useAuthenticationApiStateProxy(authApi);
  const authLoader = () => {
    return proxyAuthApi.init().catch(e => console.error(e));
  };
  const authorizationTokenProvider = async () => {
    if (!proxyAuthApi.user) {
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
          <AuthRouter loginPage={LoginPage} basename={publicUrl}>
            <HomePage />
          </AuthRouter>
        </LauncherClientProvider>
      </AuthContext.Provider>
    </DataLoader>
  );
}
