import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { CreateNewAppFlow } from '../create-new-app-flow';
import { CreateExampleAppFlow } from '../create-example-app-flow';
import { ImportExistingFlow } from '../import-existing-flow';
import { LauncherClientProvider } from '../..';

storiesOf('Flows', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('CreateNewAppFlow', () => {
    return (
      <CreateNewAppFlow/>
    );
  })

  .add('CreateExampleAppFlow', () => {
    return (
      <CreateExampleAppFlow/>
    );
  })

  .add('ImportExistingFlow', () => {
    return (
      <ImportExistingFlow/>
    );
  });
