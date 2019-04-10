import MockAuthenticationApi from './impl/mock-authentication-api';
import { KeycloakAuthenticationApi, KeycloakConfig } from './impl/keycloak-authentication-api';
import NoAuthenticationApi from './impl/no-authentication-api';
import { AuthenticationApi } from './authentication-api';
import { checkNotNull } from 'launcher-client';
import { OpenshiftAuthenticationApi, OpenshiftConfig } from './impl/openshift-authentication-api';

export { AuthContext, useAuthApi, useAuthenticationApiStateProxy } from './auth-context';
export { AuthRouter } from './auth-router';
export { AuthenticationApi } from './authentication-api';
export { KeycloakConfig } from './impl/keycloak-authentication-api';
export { OpenshiftConfig } from './impl/openshift-authentication-api';

export function newMockAuthApi() { return new MockAuthenticationApi(); }
export function newKCAuthApi(config: KeycloakConfig) { return new KeycloakAuthenticationApi(config); }
export function newOpenshiftAuthApi(config: OpenshiftConfig) { return new OpenshiftAuthenticationApi(config); }
export function newNoAuthApi() { return new NoAuthenticationApi(); }

export function newAuthApi(authenticationMode?: string, config?: any): AuthenticationApi {
  switch (authenticationMode) {
    case 'no':
      return new NoAuthenticationApi();
    case 'mock':
      return new MockAuthenticationApi();
    case 'keycloak':
      return new KeycloakAuthenticationApi(checkNotNull(config, 'keycloakConfig'));
    case 'openshift':
      return new OpenshiftAuthenticationApi(checkNotNull(config, 'openshiftConfig'));
    default:
      throw new Error(`Invalid authentication mode: ${authenticationMode}`);
  }
}
