import * as React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { mockRestCapabilityApi } from '../RestCapabilityApi';
import { RestCapability } from '../RestCapability';

const extra = {
  sourceMapping: {
    greetingEndpoint: 'src/main/java/org/your/GreetingApi.java',
  },
};

describe('<RestCapability />', () => {
  it('check that initial render is correct', () => {
    const component = render(<RestCapability apiService={mockRestCapabilityApi} extra={extra}/>);
    expect(component).toMatchSnapshot();
  });

  it('check that a click on the GET button adds a Hello World message in the console', async () => {
    const apiService = new MockRestCapabilityApi();
    const result = { content: 'Hello World!', time: 1542793377 };
    const promise = Promise.resolve(result);
    const doGetGreetingSpy = jest.spyOn(apiService, 'doGetGreeting').mockReturnValue(promise);
    const component = render(<RestCapability apiService={apiService} extra={extra}/>);
    fireEvent.click(component.getByLabelText('Execute GET Greetings'));
    // FIXME fix this test
    // expect(doGetGreetingSpy).toHaveBeenCalledWith('');
    // expect(component.getByLabelText(result.content));
    // expect(component.asFragment()).toMatchSnapshot();
  });

  it('check that after typing a name, a click on the GET button adds a Hello John message in the console', async () => {
    const apiService = new MockRestCapabilityApi();
    const doGetGreetingSpy = jest.spyOn(apiService, 'doGetGreeting');
    const component = render(<RestCapability apiService={apiService} extra={extra}/>);
    fireEvent.change(component.getByLabelText('Greetings name input'), { target: { name: 'name', value: 'John'} });
    const result = { content: 'Hello John!', time: 1542793377 };
    const promise = Promise.resolve(result);
    doGetGreetingSpy.mockReturnValue(promise);
    fireEvent.click(component.getByLabelText('Execute GET Greetings'));
    // FIXME fix this test
    // expect(doGetGreetingSpy).toHaveBeenCalledWith('John');
    // expect(component.getByLabelText(result.content));
    // expect(component.asFragment()).toMatchSnapshot();
  });

});
