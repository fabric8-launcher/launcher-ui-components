import { HttpService } from './http.service';
import DefaultLauncherClient from './impl/default.launcher.client';
import { LauncherClientConfig } from './types';
import MockLauncherClient from './impl/mock.launcher.client';
import { ReflectiveInjector } from 'injection-js';

export function defaultLauncherClient(config: LauncherClientConfig) {
  const injector = ReflectiveInjector.resolveAndCreate([HttpService]);
  return new DefaultLauncherClient(injector.get(HttpService), config);
}

export function mockLauncherClient() {
  return new MockLauncherClient();
}
