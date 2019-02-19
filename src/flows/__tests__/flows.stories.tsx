import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { mockLauncherClient } from 'launcher-client';
import { LauncherClientContext } from '../../launcher-client-context';
import { CreateNewAppFlow } from '../create-new-app-flow';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Flows', module)
  .add('CreateNewAppFlow', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <CreateNewAppFlow />
      </LauncherClientContext.Provider>
    );
  });
