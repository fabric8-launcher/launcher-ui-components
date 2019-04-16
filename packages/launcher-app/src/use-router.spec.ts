import { restoreRouterHistory, SimpleRouter } from "./use-router";
import * as H from 'history';

jest.useFakeTimers();

describe('UseRouter test', () => {
  let router: SimpleRouter;
  beforeEach(() => {
    router = {
      history: { push: jest.fn()} as unknown as H.History,
      location: {} as unknown as H.Location,
    };
  });

  it('should call / if /', () => {
    // given
    router.location.search = '?request=/';

    // when
    restoreRouterHistory(router);

    jest.runAllImmediates();

    expect(router.history.push).toBeCalledWith('/');
  });

  it('should not restore if not set', () => {
    // given
    router.location.search ='';

    // when
    restoreRouterHistory(router);

    jest.runAllImmediates();

    expect(router.history.push).toBeCalledTimes(0);
  });

  it('should be request if set', () => {
    // given
    router.location.search ='?request=/super/path';

    // when
    restoreRouterHistory(router);

    jest.runAllImmediates();

    expect(router.history.push).toBeCalledWith('/super/path');
  });
});
