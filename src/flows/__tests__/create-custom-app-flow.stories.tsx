import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { mockLauncherClient } from 'launcher-client';
import { LauncherClientContext } from '../../launcher-client-context';
import { CreateCustomAppFlow } from '../create-custom-app-flow';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('CreateCustomAppFlow', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <CreateCustomAppFlow />
      </LauncherClientContext.Provider>
    );
  });
