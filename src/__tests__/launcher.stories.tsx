import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { mockLauncherClient } from 'launcher-client';
import { LauncherClientContext } from '../launcher-client-context';
import { Launcher } from '../launcher';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Launcher', module)
  .add('component', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <Launcher />
      </LauncherClientContext.Provider>
    );
  });
