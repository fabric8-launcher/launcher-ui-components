import { restoreRouterHistory, SimpleRouter } from "./use-router";
import * as H from 'history';

describe('UseRouter test', () => {
  let router: SimpleRouter;
  beforeEach(() => {
    router = {
      history: { push: jest.fn()} as unknown as H.History,
      location: {} as unknown as H.Location,
    };
  });

  it('should home if root', () => {
    // given
    router.location.search = '?request=/';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledWith('/');
  });

  it('should not restore if not set', () => {
    // given
    router.location.search ='';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledTimes(0);
  });

  it('should be request if set', () => {
    // given
    router.location.search ='?request=/super/path';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledWith('/super/path');
  });
});
