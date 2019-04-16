import { restoreRouterHistory, BaseRouter, createRouterLink } from "./use-router";
import * as H from 'history';
import { BaseSyntheticEvent } from "react";

describe('useRouter tests', () => {
  let router: BaseRouter;
  beforeEach(() => {
    router = {
      history: {
         push: jest.fn()
      } as unknown as H.History,
      location: {} as unknown as H.Location,
    };
  });

  it('restoreRouterHistory should redirect to request correctly', () => {
    // given
    router.location.search = '?request=/';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledWith('/');
  });

  it('should not restore if request not set', () => {
    // given
    router.location.search ='';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledTimes(0);
  });

  it('should not restore if request not empty', () => {
    // given
    router.location.search ='?request=';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledTimes(0);
  });

  it('restoreRouterHistory should redirect to request correctly with another path', () => {
    // given
    router.location.search ='?request=/super/path';

    // when
    restoreRouterHistory(router);

    expect(router.history.push).toBeCalledWith('/super/path');
  });

  it('createRouterLink should return a link correctly', () => {
    // given
    const href = 'http://www.myurl.com/toto';
    const event = { preventDefault: jest.fn() } as unknown as BaseSyntheticEvent;
    router.history.createHref = jest.fn()
      .mockReturnValue(href);
    // when
    const link = createRouterLink(router, '/toto');

    expect(router.history.createHref).toBeCalledWith(H.createLocation('/toto', undefined, undefined, router.location));
    expect(link.href).toBe(href);
    link.onClick(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(router.history.push).toHaveBeenCalledWith('/toto');
  });
});
