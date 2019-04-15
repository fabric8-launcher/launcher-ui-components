import { getRedirectPath } from './launcher-app';
describe('HomePage test', () => {

  it('should home if root', () => {
    // given
    const search = '?request=/';

    // when
    const path = getRedirectPath(search);

    expect(path).toBe('/home');
  });

  it('should home if not set', () => {
    // given
    const search = '';

    // when
    const path = getRedirectPath(search);

    expect(path).toBe('/home');
  });

  it('should be request if set', () => {
    // given
    const search = '?request=/super/path';

    // when
    const path = getRedirectPath(search);

    expect(path).toBe('/super/path');
  });
});
