import * as React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, render } from 'react-testing-library';
import { DeployExampleAppFlow } from '../deploy-example-app-flow';
import { flushPromises } from './flow-helpers';
import { LauncherClientProvider } from '../../contexts/launcher-client-provider';

afterEach(() => {
  console.log('cleanup()');
  cleanup();
});

jest.useFakeTimers();

describe('<DeployExampleAppFlow />', () => {
  it('renders and initializes the DeployExampleAppFlow correctly', async () => {
    const comp = render(<LauncherClientProvider><DeployExampleAppFlow appName="my-test-app"/></LauncherClientProvider>);
    expect(comp.getByLabelText('Loading dest-repository')).toBeDefined();
    expect(comp.getByLabelText('Loading openshift-deployment')).toBeDefined();

    // Resolve data from auto loader
    await flushPromises();

    // Resolve overview promises
    await flushPromises();

    expect(comp.getByLabelText('dest-repository is configured')).toBeDefined();
    expect(comp.getByLabelText('openshift-deployment is configured')).toBeDefined();

    expect(comp.getByLabelText('example is not configured')).toBeDefined();

    expect(comp.getByLabelText('Launch Application')).toHaveAttribute('disabled');
    expect(comp.getByLabelText('Download Application')).toHaveAttribute('disabled');
  });
});
