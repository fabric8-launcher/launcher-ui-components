import * as React from 'react';
import {cleanup, render} from "react-testing-library";
import {SelectCapabilities} from "../select-capabilities";
import {mockLauncherClient} from 'launcher-client';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

afterEach(cleanup);

describe('<SelectCapabilities />', () => {
  it('renders the SelectCapabilities correctly', async () => {
    const capabilities = await client.capabilities();
    const items = capabilities.map(c => ({
      id: c.module,
      name: c.name,
      description: c.description,
      category: c.metadata.category,
      icon: c.metadata.icon,
      fields: c.props,
      selected: c.module === 'welcome',
      disabled: c.module === 'welcome'
    })).filter(c => c.category !== 'frontend');
    const comp = render(<SelectCapabilities items={items}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
