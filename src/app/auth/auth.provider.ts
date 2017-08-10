import { AUTH_API_URL, REALM, SSO_API_URL } from 'ngx-login-client';

export let authApiUrlProvider = {
  provide: AUTH_API_URL,
  useValue: "https://api.openshift.io/api/login/authorize"
};

export let realmProvider = {
  provide: REALM,
  useValue: "fabric8"
}

export let ssoApiUrlProvider = {
  provide: SSO_API_URL,
  useValue: "https://sso.openshift.io/auth/"
}