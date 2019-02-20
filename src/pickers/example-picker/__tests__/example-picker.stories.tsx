import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormPanel } from '../../../core/form-panel/form-panel';
import { mockLauncherClient } from 'launcher-client';

import { ExamplePicker } from '../example-picker';
import { ExamplesLoader } from '../../../loaders/example-catalog-loader';
import { LauncherClientContext } from '../../../contexts/launcher-client-context';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Pickers', module)
  .add('ExamplePicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ExamplesLoader>
          {result => (
            <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<ExamplePicker {...inputProps} {...result}/>)}
            </FormPanel>
          )}
        </ExamplesLoader>
      </LauncherClientContext.Provider>
    );
  });
