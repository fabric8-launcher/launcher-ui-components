import MockAuthenticationApi from './impl/mock-authentication-api';
import { KeycloakAuthenticationApi, KeycloakConfig } from './impl/keycloak-authentication-api';
import NoAuthenticationApi from './impl/no-authentication-api';
import { checkNotNull } from 'launcher-client';
import { AuthenticationApi } from './authentication-api';

export { AuthContext, useAuthApi, useAuthenticationApiStateProxy } from './auth-context';
export { AuthRouter } from './auth-router';
export { AuthenticationApi } from './authentication-api';
export { KeycloakConfig } from './impl/keycloak-authentication-api';

export function newMockAuthApi() { return new MockAuthenticationApi(); }
export function newKCAuthApi(config: KeycloakConfig) { return new KeycloakAuthenticationApi(config); }
export function newNoAuthApi() { return new NoAuthenticationApi(); }

export function newAuthApi(authenticationMode?: string, keycloakConfig?: KeycloakConfig): AuthenticationApi {
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
