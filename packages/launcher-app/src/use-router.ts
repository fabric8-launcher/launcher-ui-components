// @ts-ignore
import { __RouterContext, RouteComponentProps, StaticContext } from 'react-router';
import * as H from 'history';
import { createLocation } from 'history';
import { BaseSyntheticEvent, useContext } from 'react';
import queryString from 'query-string';

export function useRouter<Params extends { [K in keyof Params]?: string } = {}, C extends StaticContext = StaticContext, S = H.LocationState>() {
  return useContext(__RouterContext) as RouteComponentProps<Params, C, S>;
}

export const createRouterHref = (router: SimpleRouter, to: string) => {
  return router.history.createHref(createLocation(to, undefined, undefined, router.location));
};

export interface SimpleRouter {
  location: H.Location;
  history: H.History;
}

export const goToWithRouter = (router: SimpleRouter, to: string) => {
  router.history.push(to);
};

export const createRouterLink = (router: SimpleRouter, to: string) => {
  return {
    href: createRouterHref(router, to),
    onClick: (e?: BaseSyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      goToWithRouter(router, to);
    }
  };
};

export function restoreRouterHistory(router: SimpleRouter) {
  const search = router.location.search;
  if (!search) {
    return;
  }
  const requestParam = queryString.parse(search).request as string;
  if(requestParam) {
    goToWithRouter(router, requestParam);
  }
}
