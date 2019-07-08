import React from 'react';
import { render } from '@testing-library/react';

import { InlineTextInput } from '../inline-text-input';

describe('<InlineTextInput />', () => {
  it('renders the InlineTextInput correctly', () => {
    const comp = render(<InlineTextInput id="app" title="New Application:"/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
