import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { useAuthApi } from './auth-context';

type RouterComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

interface AuthRouterProps {
  loginPage: RouterComponent;
  homePage: RouterComponent;
}

export function AuthRouter(props: AuthRouterProps) {
  const authApi = useAuthApi();
  if (!authApi.user) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={props.loginPage}/>
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={props.homePage}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  );
}
