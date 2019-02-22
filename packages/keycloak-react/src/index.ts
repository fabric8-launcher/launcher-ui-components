import MockAuthenticationApi from './impl/MockAuthenticationApi';
import { KeycloakAuthenticationApi } from './impl/KeycloakAuthenticationApi';
import NoAuthenticationApi from './impl/NoAuthenticationApi';

export { AuthContext, useAuthApi, useStateOnAuthApi } from './auth-context';
export { AuthRouter } from './auth-router';
export { AuthenticationApi } from './AuthenticationApi';

export function createMockAuthApi() { return new MockAuthenticationApi(); }
export function createKCAuthApi(config: {clientId: string;realm: string;url: string;}) { return new KeycloakAuthenticationApi(config); }
export function createNoAuthApi() { return new NoAuthenticationApi(); }
