import MockAuthenticationApi from './impl/MockAuthenticationApi';
import { KeycloakAuthenticationApi, KeycloakConfig } from './impl/KeycloakAuthenticationApi';
import NoAuthenticationApi from './impl/NoAuthenticationApi';
import { checkNotNull } from 'launcher-client';

export { AuthContext, useAuthApi, useStateOnAuthApi } from './auth-context';
export { AuthRouter } from './auth-router';
export { AuthenticationApi } from './AuthenticationApi';
export { KeycloakConfig } from './impl/KeycloakAuthenticationApi';

export function newMockAuthApi() { return new MockAuthenticationApi(); }
export function newKCAuthApi(config: KeycloakConfig) { return new KeycloakAuthenticationApi(config); }
export function newNoAuthApi() { return new NoAuthenticationApi(); }

export function newAuthApi(authenticationMode?: string, keycloakConfig?: KeycloakConfig) {
  switch (authenticationMode) {
    case 'no':
      return new NoAuthenticationApi();
    case 'mock':
      return new MockAuthenticationApi();
    case 'keycloak':
      return new KeycloakAuthenticationApi(checkNotNull(keycloakConfig, 'keycloakConfig'));
    default:
      throw new Error(`Invalid authentication mode: ${authenticationMode}`);
  }
}
