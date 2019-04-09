import * as React from 'react';
import appConfig, { AppConfig, isMockMode } from '../config/appConfig';
import { HttpApi } from '../../shared/utils/HttpApi';
import appHttpApi from '../appHttpApi';

interface ApiParams {
  readonly isMockMode: boolean;
  readonly httpApi: HttpApi;
  readonly appConfig: AppConfig;
}

export type ApiFactoryFunction<T> = (config: ApiParams) => T;

export default function connectCapability<T, P>(Component: React.ComponentType<P>, serviceFactory: ApiFactoryFunction<T>) {
  return (props: P) => {
    const apiService = serviceFactory({
      isMockMode,
      httpApi: appHttpApi,
      appConfig,
    });
    return (
      <Component {...{...props, ...appConfig}} apiService={apiService}/>
    );
  };
}
