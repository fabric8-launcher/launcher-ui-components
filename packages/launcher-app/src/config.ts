import { checkNotNull } from 'launcher-client';
import { KeycloakConfig } from 'keycloak-react';

function getEnv(env: string | undefined, name: string): string | undefined {
  const config = (window as any).GLOBAL_CONFIG;
  if (config && config[name] && config[name].length > 0) {
    return config[name];
  }
  if(env && env.length === 0) {
    return undefined;
  }
  return env;
}

function requireEnv(env: string | undefined, name: string): string {
  return checkNotNull(getEnv(env, name), `process.env.${name}`);
}

export const authenticationMode = getEnv(process.env.REACT_APP_AUTHENTICATION, 'authMode') || 'keycloak';
export const isKeycloakMode = authenticationMode === 'keycloak';

export const keycloakConfig = isKeycloakMode ? {
  clientId: requireEnv(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'keycloakClientId'),
  realm: requireEnv(process.env.REACT_APP_KEYCLOAK_REALM, 'keycloakRealm'),
  url: requireEnv(process.env.REACT_APP_KEYCLOAK_URL, 'keycloakUrl'),
} as KeycloakConfig : undefined;

export const creatorApiUrl =
  getEnv(process.env.REACT_APP_CREATOR_API_URL, 'creatorApiUrl');

export const launcherApiUrl =
  getEnv(process.env.REACT_APP_LAUNCHER_API_URL, 'launcherApiUrl');
