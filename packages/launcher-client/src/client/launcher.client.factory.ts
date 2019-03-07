import { HttpService } from './http.service';
import DefaultLauncherClient from './impl/default.launcher.client';
import { LauncherClientConfig } from './types';
import MockLauncherClient from './impl/mock.launcher.client';
import { ReflectiveInjector } from 'injection-js';
import WithCacheLauncherClient from './impl/with-cache.launcher.client';

export function defaultLauncherClient(config: LauncherClientConfig) {
  const injector = ReflectiveInjector.resolveAndCreate([HttpService]);
  return new DefaultLauncherClient(injector.get(HttpService), config);
}

export function cachedLauncherClient(config: LauncherClientConfig) {
  const injector = ReflectiveInjector.resolveAndCreate([HttpService]);
  return new WithCacheLauncherClient(new DefaultLauncherClient(injector.get(HttpService), config));
}

export function mockLauncherClient() {
  return new MockLauncherClient();
}
