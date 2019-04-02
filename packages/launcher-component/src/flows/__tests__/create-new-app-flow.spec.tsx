import * as React from 'react';
import 'jest-dom/extend-expect';
import { act, cleanup, fireEvent, render } from 'react-testing-library';
import { CreateNewAppFlow } from '../create-new-app-flow';
import { LauncherClientProvider } from '../..';
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

async function configureBackend(comp, runtime, ...capabilities: string[]) {
  fireEvent.click(comp.getByLabelText('Open backend editor'));

  expect(comp.getByLabelText('Edit backend')).toBeDefined();

  // Resolve runtimes
  await flushPromises();

  fireEvent.click(comp.getByLabelText(`Choose ${runtime} as runtime`));

  // Resolve capabilities
  await flushPromises();
  // Resolve enums promises
  await flushPromises();

  capabilities.forEach(c => fireEvent.click(comp.getByLabelText(`Pick ${c} capability`)));

  fireEvent.click(comp.getByLabelText('Save backend'));

  // Resolve overview promises
  await flushPromises();
}

async function configureFrontend(comp, runtime) {
  fireEvent.click(comp.getByLabelText('Open frontend editor'));

  expect(comp.getByLabelText('Edit frontend')).toBeDefined();

  // Resolve runtimes
  await flushPromises();

  fireEvent.click(comp.getByLabelText(`Choose ${runtime} as runtime`));

  fireEvent.click(comp.getByLabelText('Save frontend'));

  // Resolve overview promises
  await flushPromises();
}

describe('<CreateNewAppFlow />', () => {
  it('renders and initializes the CreateNewAppFlow correctly', async () => {
    const comp = render(<LauncherClientProvider><CreateNewAppFlow appName="my-test-app"/></LauncherClientProvider>);
    expect(comp.getByLabelText('Loading dest-repository')).toBeDefined();
    expect(comp.getByLabelText('Loading openshift-deployment')).toBeDefined();

    // Resolve data from auto loader
    await flushPromises();

    // Resolve overview promises
    await flushPromises();

    expect(comp.getByLabelText('dest-repository is configured')).toBeDefined();
    expect(comp.getByLabelText('openshift-deployment is configured')).toBeDefined();
    expect(comp.getByLabelText('welcome-app is configured')).toBeDefined();

    expect(comp.getByLabelText('backend is not configured')).toBeDefined();
    expect(comp.getByLabelText('frontend is not configured')).toBeDefined();

    expect(comp.getByLabelText('Launch Application')).toHaveAttribute('disabled');
    expect(comp.getByLabelText('Download Application')).toHaveAttribute('disabled');
  });
  it('Configure backend and check full launch until next steps', async () => {
    const mockClient = mockLauncherClient();
    const comp = render(<LauncherClientProvider client={mockClient}><CreateNewAppFlow appName="my-test-app"/></LauncherClientProvider>);

    // Resolve data from auto loader
    await flushPromises();
    // Resolve overview promises
    await flushPromises();

    await configureBackend(comp, 'vertx', 'rest');
    expect(comp.getByLabelText('backend is configured')).toBeDefined();

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

    expect(comp.getByLabelText('Welcome Application link').getAttribute('href')).toMatchSnapshot('Welcome Application link');

    expect(comp.getByLabelText('Repository link').getAttribute('href')).toMatchSnapshot('Repository link');

  });
  it('Configure frontend, launch and check payload', async () => {
    const mockClient = mockLauncherClient();
    const comp = render(<LauncherClientProvider client={mockClient}><CreateNewAppFlow appName="my-test-app"/></LauncherClientProvider>);

    // Resolve data from auto loader
    await flushPromises();
    // Resolve overview promises
    await flushPromises();

    await configureFrontend(comp, 'react');
    expect(comp.getByLabelText('frontend is configured')).toBeDefined();

    fireEvent.click(comp.getByLabelText('Launch Application'));

    expect(mockClient.currentPayload).toMatchSnapshot('payload');

  });

  it('Configure frontend and backend, launch and check payload', async () => {
    const mockClient = mockLauncherClient();
    const comp = render(<LauncherClientProvider client={mockClient}><CreateNewAppFlow appName="my-test-app"/></LauncherClientProvider>);

    // Resolve data from auto loader
    await flushPromises();
    // Resolve overview promises
    await flushPromises();

    await configureFrontend(comp, 'react');
    expect(comp.getByLabelText('frontend is configured')).toBeDefined();

    await configureBackend(comp, 'vertx', 'rest');
    expect(comp.getByLabelText('backend is configured')).toBeDefined();

    fireEvent.click(comp.getByLabelText('Launch Application'));

    expect(mockClient.currentPayload).toMatchSnapshot('payload');
  });

  it('Configure backend with multiple capabilities, launch and check payload', async () => {
    const mockClient = mockLauncherClient();
    const comp = render(<LauncherClientProvider client={mockClient}><CreateNewAppFlow appName="my-test-app"/></LauncherClientProvider>);

    // Resolve data from auto loader
    await flushPromises();
    // Resolve overview promises
    await flushPromises();

    await configureBackend(comp, 'quarkus', 'rest', 'database');
    expect(comp.getByLabelText('backend is configured')).toBeDefined();

    fireEvent.click(comp.getByLabelText('Launch Application'));

    expect(mockClient.currentPayload).toMatchSnapshot('payload');
  });
});
