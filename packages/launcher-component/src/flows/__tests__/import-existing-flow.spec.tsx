import * as React from 'react';
import 'jest-dom/extend-expect';
import { act, cleanup, fireEvent, render } from 'react-testing-library';
import { LauncherClientProvider, ImportExistingFlow } from '../..';
import { mockLauncherClient, waitForTick } from 'launcher-client';

afterEach(() => {
  console.log('cleanup()');
  cleanup();
});

jest.useFakeTimers();

async function flushPromises() {
  // FIXME: use the new await version when it's available https://github.com/facebook/react/pull/14853
  act(() => {
    console.log('runAllTick()');
    jest.runAllTicks();
    jest.runOnlyPendingTimers();
    jest.runAllImmediates();
  });
  await waitForTick('act()');
}

async function configureSrc(comp, url) {
  fireEvent.click(comp.getByLabelText('Open src-repository editor'));
  expect(comp.getByLabelText('Edit src-repository')).toBeDefined();

  fireEvent.change(comp.getByLabelText('Git repository url'), { target: { value: url } });
  fireEvent.click(comp.getByText('Done'));

  // Resolve fetch url
  await flushPromises();

  fireEvent.click(comp.getByText('Advanced settings'));
  expect(comp.getByLabelText('select-buildImage')).toBeDefined();

  fireEvent.click(comp.getByLabelText('Choose Java Code Builder'));

  fireEvent.change(comp.getByPlaceholderText('Type the environment variable name'), {target: {value: 'JAVA_DEBUG'}});
  fireEvent.change(comp.getByPlaceholderText('Type the environment variable value'), {target: {value: 'true'}});
  fireEvent.click(comp.getByLabelText('Save src-repository'));

  // Resolve overview promises
  await flushPromises();
}

describe('<ImportExistingFlow />', () => {
  it('renders and initializes the ImportExistingFlow correctly', async () => {
    const comp = render(<LauncherClientProvider><ImportExistingFlow /></LauncherClientProvider>);
    expect(comp.getByLabelText('openshift-deployment is not configured')).toBeDefined();

    // Resolve overview promises
    await flushPromises();
    await flushPromises();

    expect(comp.getByLabelText('openshift-deployment is configured')).toBeDefined();

    expect(comp.getByLabelText('Launch Application')).toHaveAttribute('disabled');
    expect(comp.getByLabelText('Download Application')).toHaveAttribute('disabled');
  });

  it('Configure source repository to import and check full launch until next steps', async () => {
    const mockClient = mockLauncherClient();
    const comp = render(<LauncherClientProvider client={mockClient}><ImportExistingFlow /></LauncherClientProvider>);

    // Resolve overview promises
    await flushPromises();

    await configureSrc(comp, 'https://github.com/nodeshift-starters/nodejs-rest-http');
    expect(comp.getByText('Import is configured')).toBeDefined();

    expect(comp.getByLabelText('Launch Application')).not.toHaveAttribute('disabled');
    expect(comp.getByLabelText('Download Application')).not.toHaveAttribute('disabled');

    fireEvent.click(comp.getByLabelText('Launch Application'));

    expect(comp.getByLabelText('Waiting for server response...')).toBeDefined();

    expect(mockClient.currentPayload).toMatchSnapshot('payload');

    // Resolve launch result
    await flushPromises();

    expect(comp.getByLabelText('Receiving launch progress events...')).toBeDefined();
    expect(comp.getByLabelText('GITHUB_CREATE is in-progress')).toBeDefined();
    expect(comp.getByLabelText('GITHUB_PUSHED is in-progress')).toBeDefined();
    expect(comp.getByLabelText('OPENSHIFT_CREATE is in-progress')).toBeDefined();
    expect(comp.getByLabelText('OPENSHIFT_PIPELINE is in-progress')).toBeDefined();
    expect(comp.getByLabelText('GITHUB_WEBHOOK is in-progress')).toBeDefined();

    // Resolve GITHUB_CREATE
    await flushPromises();

    expect(comp.getByLabelText('GITHUB_CREATE is completed')).toBeDefined();

    // Resolve GITHUB_PUSHED
    await flushPromises();
    expect(comp.getByLabelText('GITHUB_PUSHED is completed')).toBeDefined();

    // Resolve OPENSHIFT_CREATE
    await flushPromises();
    expect(comp.getByLabelText('OPENSHIFT_CREATE is completed')).toBeDefined();

    // Resolve OPENSHIFT_PIPELINE
    await flushPromises();
    expect(comp.getByLabelText('OPENSHIFT_PIPELINE is completed')).toBeDefined();

    // Resolve GITHUB_WEBHOOK
    await flushPromises();
    expect(comp.getByLabelText('GITHUB_WEBHOOK is completed')).toBeDefined();

    // Resolve complete progress
    await flushPromises();
    expect(comp.getByLabelText('Your Application has been launched')).toBeDefined();

    expect(comp.getByLabelText('Console link').getAttribute('href')).toMatchSnapshot('Console link');
  });
});
