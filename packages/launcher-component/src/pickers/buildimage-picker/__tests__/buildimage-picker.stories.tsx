import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { mockLauncherClient } from 'launcher-client';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { LauncherClientContext } from '../../../contexts/launcher-client-context';

import { BuildImageAnalyzerLoader } from '../../../loaders/buildimage-loader';
import { BuildImagePicker, defaultBuidImagePickerValue } from '../buildimage-picker';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Pickers', module)
  .add('BuildImagePicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <BuildImageAnalyzerLoader repository={{org: 'jean-bon', name: 'bayonne'}}>
          {result => (
            <FormPanel
              value={defaultBuidImagePickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
            >
              {
                (inputProps) => (<BuildImagePicker {...inputProps} result={result}/>)}
            </FormPanel>
          )}
        </BuildImageAnalyzerLoader>
      </LauncherClientContext.Provider>
    );
  });
