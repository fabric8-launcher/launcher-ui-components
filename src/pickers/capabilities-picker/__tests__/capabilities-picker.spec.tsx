import * as React from 'react';
import {cleanup, render} from "react-testing-library";
import {mockLauncherClient, propsWithValuesMapper} from 'launcher-client';
import {capabilityToItem, defaultCapabilitiesPickerValue} from "../capabilities-adapter";
import {CapabilitiesPicker} from "../capabilities-picker";

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

afterEach(cleanup);

describe('<CapabilitiesPicker />', () => {
  it('renders the CapabilitiesPicker correctly', async () => {
    const enums = await client.enums();
    let capabilities = await client.capabilities();
    const items = capabilities
      .map(propsWithValuesMapper(enums))
      .map(capabilityToItem)
      .filter(c => c.category !== 'frontend');
    const comp = render(<CapabilitiesPicker items={items} value={defaultCapabilitiesPickerValue} onChange={() => {}}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
