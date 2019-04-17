import * as React from 'react';
import HealthChecksCapability from '../HealthChecksCapability';
import { MockHealthChecksCapabilityApi } from '../HealthChecksCapabilityApi';
import { fireEvent, render } from 'react-testing-library';


describe('<HealthChecksCapability />', () => {
  it('check that initial render is correct', () => {
    const component = render(<HealthChecksCapability apiService={new MockHealthChecksCapabilityApi()}/>);
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('check that readiness is working', async () => {
    const apiService = new MockHealthChecksCapabilityApi();
    const result = { content: 'OK', time: 1542793377 };
    const doGetReadiness = jest.spyOn(apiService, 'doGetReadiness').mockResolvedValue(result);
    const component = render(<HealthChecksCapability apiService={apiService}/>);
    fireEvent.click(component.getByLabelText('Execute Readiness check'));
    // FIXME fix this test
    // expect(doGetReadiness).toHaveBeenCalled();
    // expect(component.getByLabelText(result.content));
    // expect(component.asFragment()).toMatchSnapshot();
  });
});
