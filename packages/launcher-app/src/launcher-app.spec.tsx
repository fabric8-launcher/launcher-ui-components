import { restoreHistory } from './launcher-app';

describe('HomePage test', () => {

  beforeEach(() => {
    history.pushState = jest.fn();
  });

  it('should home if root', () => {
    // given
    const search = '?request=/';

    // when
    restoreHistory(search);

    expect(history.pushState).toBeCalledWith(undefined, document.title, '/home');
  });

  it('should not restore if not set', () => {
    // given
    const search = '';

    // when
    restoreHistory(search);

    expect(history.pushState).toBeCalledTimes(0);
  });

  it('should be request if set', () => {
    // given
    const search = '?request=/super/path';

    // when
    restoreHistory(search);

    expect(history.pushState).toBeCalledWith(undefined, document.title, '/super/path');
  });
});
