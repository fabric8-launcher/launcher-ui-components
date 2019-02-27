import DefaultLauncherClient from './impl/default.launcher.client';
import { LauncherClientConfig } from './types';
import MockLauncherClient from './impl/mock.launcher.client';
export declare function defaultLauncherClient(config: LauncherClientConfig): DefaultLauncherClient;
export declare function mockLauncherClient(): MockLauncherClient;
