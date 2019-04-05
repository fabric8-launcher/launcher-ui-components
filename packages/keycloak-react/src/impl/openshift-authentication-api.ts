import { AuthenticationApi } from '..';
import { OptionalUser } from '../authentication-api';

export interface OpenshiftConfig {
  client_id: string;
  url: string;
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
    if (user) {
      try {
        this._user = JSON.parse(user);
      } catch {
        localStorage.removeItem(this.storageKey);
      }
      this.triggerUserChange();
    } else {
      const queryString = location.href.substr(location.href.indexOf('#') + 1);
      const fragmentParams: any = {};
      const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
      for (const p of pairs) {
        const pair = p.split('=');
        fragmentParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }

      if (fragmentParams.access_token) {
        this._user = {
          userName: 'user',
          userPreferredName: 'user',
          token: { header: 'X-OpenShift-Authorization', token: fragmentParams.access_token},
          sessionState: '',
          accountLink: {},
        };
        localStorage.setItem(this.storageKey, JSON.stringify(this._user));
        this.triggerUserChange();
      }
    }
    return this._user;
  }

  public generateAuthorizationLink = (provider?: string, redirect?: string): string => {
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
}
