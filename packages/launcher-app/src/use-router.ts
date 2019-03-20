// @ts-ignore
import { __RouterContext, RouteComponentProps, StaticContext } from 'react-router';
import * as H from 'history';
import { createLocation } from 'history';
import { BaseSyntheticEvent, useContext } from 'react';

export function useRouter<Params extends { [K in keyof Params]?: string } = {}, C extends StaticContext = StaticContext, S = H.LocationState>() {
  return useContext(__RouterContext) as RouteComponentProps<Params,C,S>;
}

export const useCreateLink = (to: string) => {
  const router = useRouter();
  return {
    href: router.history.createHref(createLocation(to, undefined, undefined, router.location)),
    onClick: (e?: BaseSyntheticEvent) => {
      if(e) {
        e.preventDefault();
      }
      router.history.push(to);
    }
  };
};
