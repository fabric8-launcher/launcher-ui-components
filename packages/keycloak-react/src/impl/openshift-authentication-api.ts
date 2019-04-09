import { AuthenticationApi } from '..';
import { OptionalUser } from '../authentication-api';
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
  private readonly storageKey = 'openshift-auth';
  private _user: OptionalUser;
  private onUserChangeListener?: (user: OptionalUser) => void = undefined;

  constructor(private config: OpenshiftConfig) {
    if (!config.response_type) {
      config.response_type = 'token';
      config.redirect_uri = location.href;
    }
  }

  public async init(): Promise<OptionalUser> {
    const user = localStorage.getItem(this.storageKey);
    let token: string = '';
    if (user) {
      try {
        this._user = JSON.parse(user);
        token = this._user!.token;
      } catch {
        localStorage.removeItem(this.storageKey);
      }
      this.triggerUserChange();
    } else {
      const params = this.parseQuery(location.hash.substring(1));

      token = params.access_token;
    }

    if (token !== '') {
      try {
        const response = await axios.get(this.config.token_uri, {
          headers:
          {
            'X-OpenShift-Authorization': `Bearer ${token}`,
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo'
          }
        });

        this._user = {
          userName: response.data.name,
          userPreferredName: response.data.name,
          token: { header: 'X-OpenShift-Authorization', token },
          sessionState: '',
          accountLink: {},
        };
        localStorage.setItem(this.storageKey, JSON.stringify(this._user));
        this.triggerUserChange();
      } catch (e) {
        localStorage.removeItem(this.storageKey);
      }
    }

    const query = location.href.substr(location.href.indexOf('?') + 1);
    const code = this.parseQuery(query).code;

    if (code) {
      const response = await axios.post('/launch/github/access_token',
        { ...this.config, code, state: 'g~KC*#K(' }
      );
      console.log('access_code', response.data.access_token);
    }
    return this._user;
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
    if (provider === 'github') {
      return 'https://github.com/login/oauth/authorize?response_type=code&client_id=' +
        `${this.config.gitId}&redirect_uri=${redirect || location.href}&scope=repo%2Cadmin%3Arepo_hook&state=g~KC*%23K(`;
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
