import { checkNotNull } from 'launcher-client';
import { KeycloakConfig, OpenshiftConfig } from 'keycloak-react';

function getEnv(env: string | undefined, name: string): string | undefined {
  const globlaConfig = (window as any).GLOBAL_CONFIG;
  if (globlaConfig && globlaConfig[name] && globlaConfig[name].length > 0) {
    return globlaConfig[name];
  }
  if (env && env.length === 0) {
    return undefined;
  }
  return env;
}

function requireEnv(env: string | undefined, name: string): string {
  return checkNotNull(getEnv(env, name), `process.env.${name}`);
}

export const publicUrl = process.env.PUBLIC_URL && `${process.env.PUBLIC_URL}/`;

export const keycloakUrl = getEnv(process.env.REACT_APP_KEYCLOAK_URL, 'keycloakUrl');
export const authenticationMode = getEnv(process.env.REACT_APP_AUTHENTICATION, 'authMode')
  || (keycloakUrl ? 'keycloak' : 'no');
export const isKeycloakMode = authenticationMode === 'keycloak';

export const config = isKeycloakMode ? {
  clientId: requireEnv(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'keycloakClientId'),
  realm: requireEnv(process.env.REACT_APP_KEYCLOAK_REALM, 'keycloakRealm'),
  url: requireEnv(process.env.REACT_APP_KEYCLOAK_URL, 'keycloakUrl'),
} as KeycloakConfig : authenticationMode === 'openshift' ? {
  client_id: requireEnv(process.env.REACT_APP_OPENSHIFT_CLIENT_ID, 'openshiftClientId'),
  url: requireEnv(process.env.REACT_APP_OPENSHIFT_AUTH_URL, 'openshiftUrl'),
} as OpenshiftConfig : undefined;

const launcherClientApiMode = process.env.REACT_APP_CLIENT !== 'mock';

export const creatorApiUrl =
  getEnv(launcherClientApiMode ? process.env.REACT_APP_CREATOR_API_URL : undefined, 'creatorApiUrl');

export const launcherApiUrl =
  getEnv(launcherClientApiMode ? process.env.REACT_APP_LAUNCHER_API_URL : undefined, 'launcherApiUrl');

export const sentryDsn =
  getEnv(process.env.REACT_APP_SENTRY_DSN, 'sentryDsn');
