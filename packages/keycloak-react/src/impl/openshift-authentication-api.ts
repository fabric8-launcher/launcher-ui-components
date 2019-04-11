import { AuthenticationApi } from '..';
import { OptionalUser, AuthorizationToken } from '../authentication-api';
import axios from 'axios';

export interface OpenshiftConfig {
  gitId: string;
  gitSecret: string;
  client_id: string;
  url: string;
  token_uri: string;
  redirect_uri?: string;
  response_type?: string;
}

export class OpenshiftAuthenticationApi implements AuthenticationApi {
  public readonly storageKey = 'openshift-auth';
  private readonly openshiftAuthKey = 'X-OpenShift-Authorization';
  private _user: OptionalUser;
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;

  constructor(private config: OpenshiftConfig) {
    if (!config.response_type) {
      config.response_type = 'token';
      config.redirect_uri = location.href;
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

    if (token) {
      const username = await this.validateToken(token);
      if (!this._user) {
        this._user = {
          userName: username,
          userPreferredName: username,
          token: [{ header: this.openshiftAuthKey, token }],
          sessionState: '',
          accountLink: {},
        };
      }
    }

    const gitAccessToken = await this.getGitHubAccessToken();
    if (gitAccessToken && this._user) {
      const tokens = this._user.token as AuthorizationToken[];
      tokens.push({ header: 'X-Git-Authorization', token: gitAccessToken });
    }

    this.storeUser();
    return this._user;
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    if (provider === 'github') {
      return 'https://github.com/login/oauth/authorize?response_type=code&client_id=' +
        `${this.config.gitId}&redirect_uri=${redirect || location.href}&scope=repo%2Cadmin%3Arepo_hook&state=51DpNYJ2`;
    }
    return '';
  };

  public login = (): void => {
    const url = this.config.url + '?' + Object.keys(this.config).map((key) => {
      return [key, this.config[key]].map(encodeURIComponent).join('=');
    }).join('&');

    window.location.href = url;
  };

  public logout = (): void => {
    localStorage.removeItem(this.storageKey);
    location.reload();
  };

  public getAccountManagementLink = () => {
    return '';
  };

  public refreshToken = async (force?: boolean): Promise<OptionalUser> => {
    return this._user;
  }

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
    const user = localStorage.getItem(this.storageKey);
    try {
      if (user) {
        return JSON.parse(user);
      }
    } catch(e) {
      console.warn('stored user was corrupte');
      localStorage.removeItem(this.storageKey);
    }
    return undefined;
  }

  private getLoginTokenFromUser(user: OptionalUser) {
    return (user!.token as AuthorizationToken[]).filter(t => t.header === this.openshiftAuthKey)[0].token;
  }

  private storeUser() {
    if (this.user) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.user));
      this.triggerUserChange();
    }
  }

  private async validateToken(token: string): Promise<string> {
    try {
      const response = await axios.get(this.config.token_uri, {
        headers: {
          'X-OpenShift-Authorization': `Bearer ${token}`,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo'
        }
      });
      return response.data.name;
    } catch (e) {
      this.logout();
    }
    return '';
  }

  private async getGitHubAccessToken(): Promise<string> {
    const query = location.href.substr(location.href.indexOf('?') + 1);
    const code = this.parseQuery(query).code;
    if (code) {
      const response = await axios.post('/launch/github/access_token',
        { client_id: this.config.gitId, client_secret: this.config.gitSecret, code, state: '51DpNYJ2' });
      return response.data.access_token;
    }
    return '';
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
