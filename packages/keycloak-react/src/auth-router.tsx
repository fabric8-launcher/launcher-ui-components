import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { useAuthApi } from './auth-context';

type RouterComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

interface AuthRouterProps {
  loginPage: RouterComponent;
  homePage?: RouterComponent;
  basename?: string;
  children?: React.ReactNode;
}

export function AuthRouter(props: AuthRouterProps) {
  const authApi = useAuthApi();
  if (!authApi.user && authApi.enabled) {
    return (
      <BrowserRouter basename={props.basename}>
        <Switch>
          <Route path="/login" exact component={props.loginPage}/>
          <Redirect to={{ pathname: '/login', search: `?request=${location.pathname}` }}/>
        </Switch>
      </BrowserRouter>
    );
  }
  if(props.children) {
    return (<React.Fragment>{props.children}</React.Fragment>);
  }
  return (
    <BrowserRouter basename={props.basename}>
      <Switch>
        <Route path="/" exact component={props.homePage}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  );
}
