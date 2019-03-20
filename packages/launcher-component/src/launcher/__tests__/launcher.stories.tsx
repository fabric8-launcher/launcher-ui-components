import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { StateLauncher } from '../launcher';
import { LauncherClientProvider } from '../../contexts/launcher-client-provider';

storiesOf('Launcher', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('component', () => {
    return (
      <StateLauncher/>
    );
  });
