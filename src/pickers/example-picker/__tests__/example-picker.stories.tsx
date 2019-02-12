import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {FormPanel} from '../../../core/form-panel/form-panel';
import {mockLauncherClient} from 'launcher-client';

import {ExamplePicker} from '../example-picker';
import {LauncherClientContext} from '../../../launcher-client-context';
import {ExamplesLoader} from '../example-loader';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('ExamplePicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ExamplesLoader>
          {missions => (
            <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<ExamplePicker {...inputProps} missions={missions}/>)}
            </FormPanel>
          )}
        </ExamplesLoader>
      </LauncherClientContext.Provider>
    );
  });
