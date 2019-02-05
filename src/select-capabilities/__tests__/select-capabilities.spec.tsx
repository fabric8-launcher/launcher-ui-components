import * as React from 'react';
import {cleanup, render} from "react-testing-library";
import {SelectCapabilities} from "../select-capabilities";
import {mockLauncherClient, propsWithValuesMapper} from 'launcher-client';
import {capabilityToItem} from "../capabilities-adapter";

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

afterEach(cleanup);

describe('<SelectCapabilities />', () => {
  it('renders the SelectCapabilities correctly', async () => {
    const enums = await client.enums();
    let capabilities = await client.capabilities();
    const items = capabilities
      .map(propsWithValuesMapper(enums))
      .map(capabilityToItem)
      .filter(c => c.category !== 'frontend');
    const comp = render(<SelectCapabilities items={items}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
