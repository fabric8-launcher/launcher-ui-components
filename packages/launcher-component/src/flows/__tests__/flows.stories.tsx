import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { CreateNewAppFlow } from '../create-new-app-flow';
import { CreateExampleAppFlow } from '../create-example-app-flow';
import { ImportExistingFlow } from '../import-existing-flow';
import { LauncherClientProvider } from '../..';

storiesOf('Flows', module)
  .add('CreateNewAppFlow', () => {
    return (
      <LauncherClientProvider>
        <CreateNewAppFlow />
      </LauncherClientProvider>
    );
  })

  .add('CreateExampleAppFlow', () => {
    return (
      <LauncherClientProvider>
        <CreateExampleAppFlow />
      </LauncherClientProvider>
    );
  })

  .add('ImportExistingFlow', () => {
    return (
      <LauncherClientProvider>
        <ImportExistingFlow />
      </LauncherClientProvider>
    );
  });
