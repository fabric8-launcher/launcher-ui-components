import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';
import { OpenshiftAuthenticationApi } from './openshift-authentication-api';
import { AuthorizationToken } from '../authentication-api';

describe('Openshift authentication', () => {
  const tokenUri = 'http://token_uri/';
  const authentication = new OpenshiftAuthenticationApi({ token_uri: tokenUri } as any);
  const mock = new MockAdaptor(axios);

  beforeEach(() => {
    Object.defineProperty(global, '_localStorage', {
      value: new LocalStorage(jest),
      writable: false,
    });
  });

  it('should be undefined', async done => {
    // when
    const user = await authentication.init();

    expect(user).toBeUndefined();
    done();
  });

  it('should get user when token on url', async done => {
    // given
    location.hash = '#access_token=1235';
    mock.onGet(tokenUri).reply(200, '{"name": "developer"}');

    // when
    const user = await authentication.init();

    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(user).toBeDefined();
    expect(user!.userName).toBe('developer');
    expect(user!.token).toBeDefined();
    expect((user!.token as AuthorizationToken[])[0].token).toBe('1235');
    done();
  });

  it('should validate token of stored user', async done => {
    // given
    localStorage._STORE_[authentication.storageKey] = '{"token":[{"header":"X-OpenShift-Authorization","token":"123"}]}';
    mock.onGet(tokenUri).reply(200, 'ignored');

    // when
    const user = await authentication.init();

    expect(localStorage.getItem).toBeCalled();
    expect(user).toBeDefined();
    done();
  });

  it('should logout on invalid token', async done => {
    // given
    localStorage._STORE_[authentication.storageKey] = '{"token":[{"header":"X-OpenShift-Authorization","token":"123"}]}';
    mock.onGet(tokenUri).reply(401);
    window.location.reload = jest.fn();

    // when
    await authentication.init();

    expect(localStorage.getItem).toBeCalled();
    expect(localStorage.removeItem).toBeCalled();
    expect(window.location.reload).toBeCalled();
    done();
  });

  it('should fetch git access token', async done => {
    // given
    localStorage._STORE_[authentication.storageKey] = '{"token":[{"header":"X-OpenShift-Authorization","token":"123"}]}';
    location.hash = '?code=githubcode'; // mock query part of url
    mock.onPost('/launch/github/access_token').reply(200, '{"access_token": "super"}');

    // when
    const user = await authentication.init();

    expect(user).toBeDefined();
    expect(user!.token).toBeDefined();
    expect(user!.token.length).toBe(2);
    expect((user!.token as AuthorizationToken[])[1].token).toBe('super');
    done();
  });
});

export class LocalStorage {
  constructor(jest) {
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: jest.fn(key => this[key] || null),
    });
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      value: jest.fn((key, val = '') => {
        this[key] = val + '';
      }),
    });
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: jest.fn(key => {
        delete this[key];
      }),
    });
  }
  get length() {
    return Object.keys(this).length;
  }
  get _STORE_() {
    return this;
  }
}
