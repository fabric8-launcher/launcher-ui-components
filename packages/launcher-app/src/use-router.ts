// @ts-ignore
import { __RouterContext, RouteComponentProps, StaticContext } from 'react-router';
import * as H from 'history';
import { useContext } from 'react';

export function useRouter<Params extends { [K in keyof Params]?: string } = {}, C extends StaticContext = StaticContext, S = H.LocationState>() {
  return useContext(__RouterContext) as RouteComponentProps<Params,C,S>;
}
