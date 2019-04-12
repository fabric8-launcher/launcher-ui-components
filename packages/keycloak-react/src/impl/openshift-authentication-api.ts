import { AuthenticationApi } from '..';
import { OptionalUser, AuthorizationToken } from '../authentication-api';
import axios from 'axios';

export interface OpenshiftConfig {
  github: {
    clientId: string;
    secret: string;
    validateTokenUri: string;
    redirectUri?: string;
  };
  openshift: {
    clientId: string;
    url: string;
    validateTokenUri: string;
    responseType?: string;
    redirectUri?: string;
  };
}

export const OPENSHIFT_AUTH_HEADER_KEY = 'X-OpenShift-Authorization';
export const GIT_AUTH_HEADER_KEY = 'X-Git-Authorization';
export const OPENSHIFT_AUTH_STORAGE_KEY = 'openshift-auth';

export class OpenshiftAuthenticationApi implements AuthenticationApi {
  private _user: OptionalUser;
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;

  constructor(private config: OpenshiftConfig) {
    if (!config.openshift.responseType) {
      config.openshift.responseType = 'token';
    }
    if (!config.openshift.redirectUri) {
      config.openshift.redirectUri = location.href;
    }
    if (!config.github.redirectUri) {
      config.github.redirectUri = location.href;
    }
  }

  public async init(): Promise<OptionalUser> {
    this._user = this.storedUser;
    let token: string;
    if (this._user) {
      token = this.getLoginTokenFromUser(this._user);
    } else {
      const params = this.parseQuery(location.hash.substring(1));
      token = params.access_token;
    }
    const githubAccessToken = this.getUserGitHubAuthorizationToken();
    if (token) {
      try {
        const username = await this.validateToken(token);
        this._user = {
          userName: username,
          userPreferredName: username,
          token: [{header: OPENSHIFT_AUTH_HEADER_KEY, token},
            {header: GIT_AUTH_HEADER_KEY, token: githubAccessToken || ''}],
          sessionState: '',
          accountLink: {},
        };
      } catch (e) {
        this.logout();
      }
    }

    if(!githubAccessToken) {
      const gitAccessToken = await this.getGitHubAccessToken();
      if (gitAccessToken && this._user) {
        const tokens = this._user.token as AuthorizationToken[];
        tokens.find(t => t.header === GIT_AUTH_HEADER_KEY)!.token = gitAccessToken;
      }
    }

    this.storeUser();

    return this._user;
  }

  public generateAuthorizationLink = (provider?: string, redirect: string = this.config.github.redirectUri!): string => {
    if (provider === 'github') {
      return 'https://github.com/login/oauth/authorize?response_type=code&client_id=' +
        `${this.config.github.clientId}&redirect_uri=${redirect}&scope=repo%2Cadmin%3Arepo_hook`;
    }
    return '';
  };

  public login = (): void => {
    const conf = this.config.openshift;
    const url = `${conf.url}` +
      `?client_id=${encodeURIComponent(conf.clientId)}` +
      `&response_type=${encodeURIComponent(conf.responseType!)}` +
      `&redirect_uri=${encodeURIComponent(conf.redirectUri!)}`;
    window.location.assign(url);
  };

  public logout = (): void => {
    localStorage.removeItem(OPENSHIFT_AUTH_STORAGE_KEY);
    this._user = undefined;
    this.triggerUserChange();
  };

  public getAccountManagementLink = () => {
    return '';
  };

  public refreshToken = async (force?: boolean): Promise<OptionalUser> => {
    return this._user;
  };

  get user() {
    return this._user;
  }

  get enabled(): boolean {
    return true;
  }

  public setOnUserChangeListener(listener: (user: OptionalUser) => void) {
    this.onUserChangeListener = listener;
  }

  private triggerUserChange() {
    if (this.onUserChangeListener) {
      this.onUserChangeListener(this._user);
    }
  }

  private get storedUser(): OptionalUser | undefined {
    const user = localStorage.getItem(OPENSHIFT_AUTH_STORAGE_KEY);
    try {
      if (user) {
        return JSON.parse(user);
      }
    } catch (e) {
      console.warn('stored user was corrupte');
      localStorage.removeItem(OPENSHIFT_AUTH_STORAGE_KEY);
    }
    return undefined;
  }

  private getLoginTokenFromUser(user: OptionalUser) {
    return (user!.token as AuthorizationToken[]).filter(t => t.header === OPENSHIFT_AUTH_HEADER_KEY)[0].token;
  }

  private storeUser() {
    if (this.user) {
      localStorage.setItem(OPENSHIFT_AUTH_STORAGE_KEY, JSON.stringify(this.user));
      this.triggerUserChange();
    }
  }

  private async validateToken(token: string): Promise<string> {
    const response = await axios.get(this.config.openshift.validateTokenUri, {
      headers: {
        'X-OpenShift-Authorization': `Bearer ${token}`,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo'
      }
    });
    return response.data.name;
  }

  private async getGitHubAccessToken(): Promise<string | undefined> {
    const query = location.href.substr(location.href.indexOf('?') + 1);
    const code = this.parseQuery(query).code;
    if (code) {
      const response = await axios.post(this.config.github.validateTokenUri,
        {client_id: this.config.github.clientId, client_secret: this.config.github.secret, code},
        {headers: {Accept: 'application/json'}});
      return response.data.access_token;
    }
    return undefined;
  }

  private getUserGitHubAuthorizationToken() {
    const token = this._user && (this._user.token as AuthorizationToken[]).find(t => t.header === GIT_AUTH_HEADER_KEY);
    return token && token.token;
  }

  private parseQuery(queryString: string): { [key: string]: string } {
    return queryString.split('&')
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1] || '');
        }
        return initial;
      }, {});
  }
}
