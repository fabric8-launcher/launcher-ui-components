import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormPanel } from '../../../core/form-panel/form-panel';
import { mockLauncherClient } from 'launcher-client';

import { ExamplePicker } from '../example-picker';
import { LauncherClientContext } from '../../../launcher-client-context';
import { ExampleCatalogLoader } from '../../../loaders/example-catalog-loader';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('ExamplePicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ExampleCatalogLoader>
          {result => (
            <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<ExamplePicker {...inputProps} {...result}/>)}
            </FormPanel>
          )}
        </ExampleCatalogLoader>
      </LauncherClientContext.Provider>
    );
  });
