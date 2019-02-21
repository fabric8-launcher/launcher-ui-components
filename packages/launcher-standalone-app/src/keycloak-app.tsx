import * as React from 'react';

interface KeycloakAppProps {
  guestPage: React.ReactNode;
  userPage: React.ReactNode;
}

function Router(props: {authenticated: boolean}) {
  if (!props.authenticated) {
    return (
      <BrowserRouter>
        <Route path="/">
          <Switch>
            <Route path="/home" component={HomePageContainer}/>
            <Route path="/login" component={LoginPageContainer}/>
            <Redirect from="/wizard" to="/login"/>
            <Redirect from="/" to="/home"/>
          </Switch>
        </Route>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Route path="/">
        <Switch>
          <Route exact={true} path="/wizard" component={WizardPageContainer}/>
          <Route path="/home" component={HomePageContainer}/>
          <Redirect from="/" to="/wizard"/>
        </Switch>
      </Route>
    </BrowserRouter>
  );
}

export function KeycloakApp(props: KeycloakAppProps) {

}


