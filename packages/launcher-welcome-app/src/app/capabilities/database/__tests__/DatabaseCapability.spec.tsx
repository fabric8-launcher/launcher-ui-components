import * as React from 'react';
import { act, cleanup, fireEvent, render } from 'react-testing-library';
import { DatabaseCapability, DatabaseCapabilityApiContext } from '../DatabaseCapability';
import { MOCK_FRUITS, newMockDatabaseCapabilityApi } from '../DatabaseCapabilityApi';

const extra = {
  sourceMapping: {
    dbEndpoint: 'src/main/java/org/your/DbEndpoint.java',
  },
  sourceRepository: {
    url: 'https://www.github.com/ia3andy/toto',
    provider: 'github',
  },
};

jest.useFakeTimers();

afterEach(() => {
  console.log('cleanup()');
  cleanup();
});

describe('<DatabaseCapability />', () => {
  it('check that initial render is correct', () => {
    const component = render(<DatabaseCapability sourceMapping={extra.sourceMapping} sourceRepository={extra.sourceRepository} />);
    expect(component).toMatchSnapshot();
  });

  it('check that a click on the GET button list the fruits in the console', async () => {
    const api = newMockDatabaseCapabilityApi();
    const result = { content: MOCK_FRUITS, time: 1542793377 };
    const spy = jest.spyOn(api, 'doFetchFruits').mockResolvedValue(result);
    const Wrapper: React.FunctionComponent = (props) => (<DatabaseCapabilityApiContext.Provider value={api}>{props.children}</DatabaseCapabilityApiContext.Provider>)
    const component = render(<DatabaseCapability sourceMapping={extra.sourceMapping} sourceRepository={extra.sourceRepository} />, { wrapper: Wrapper });
    fireEvent.click(component.getByLabelText('Execute GET Fruits'));
    await act(async () => {
      await spy.mock.results[0];
    });
    expect(spy).toHaveBeenCalled();
    expect(component.getByLabelText(JSON.stringify(MOCK_FRUITS)));
    expect(component.asFragment()).toMatchSnapshot();
  });
});
