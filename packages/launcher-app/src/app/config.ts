import { checkNotNull } from 'launcher-client';
import { OpenshiftConfig, KeycloakConfig } from '../auth/types';

function getEnv(env: string | undefined, name: string): string | undefined {
  const globalConfig = (window as any).GLOBAL_CONFIG;
  if (globalConfig && globalConfig[name] && globalConfig[name].length > 0) {
    return globalConfig[name];
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

export const authConfig = {} as OpenshiftConfig|KeycloakConfig;

if (isKeycloakMode) {
  const config = authConfig as KeycloakConfig;
  config.clientId = requireEnv(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'keycloakClientId');
  config.realm = requireEnv(process.env.REACT_APP_KEYCLOAK_REALM, 'keycloakRealm');
  config.url = requireEnv(process.env.REACT_APP_KEYCLOAK_URL, 'keycloakUrl');
}

if (authenticationMode === 'openshift') {
  const config = authConfig as OpenshiftConfig;
  config.openshift = {
    clientId: requireEnv(process.env.REACT_APP_OPENSHIFT_CLIENT_ID, 'openshiftClientId'),
    url: requireEnv(process.env.REACT_APP_OPENSHIFT_AUTH_URL, 'openshiftUrl'),
    validateTokenUri: `${requireEnv(process.env.REACT_APP_LAUNCHER_API_URL, 'launcherApiUrl')}/services/openshift/user`,
  };
  config.github = {
    clientId: requireEnv(process.env.REACT_APP_GITHUB_CLIENT_ID, 'githubClientId'),
    secret: requireEnv(process.env.REACT_APP_GITHUB_SECRET, 'githubSecret'),
    validateTokenUri: getEnv(process.env.REACT_APP_GITHUB_VALIDATE_URI, 'githubValidateUri') || '/launch/github/access_token',
  };
}

const launcherClientApiMode = process.env.REACT_APP_CLIENT !== 'mock';

export const creatorApiUrl =
  getEnv(launcherClientApiMode ? process.env.REACT_APP_CREATOR_API_URL : undefined, 'creatorApiUrl');

export const launcherApiUrl =
  getEnv(launcherClientApiMode ? process.env.REACT_APP_LAUNCHER_API_URL : undefined, 'launcherApiUrl');

export const sentryDsn =
  getEnv(process.env.REACT_APP_SENTRY_DSN, 'sentryDsn');
