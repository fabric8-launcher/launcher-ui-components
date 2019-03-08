import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';

import { BuildImageAnalyzerLoader } from '../../loaders/buildimage-loader';
import { BuildImagePicker, defaultBuidImagePickerValue } from '../buildimage-picker';
import { LauncherClientProvider } from '../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('BuildImagePicker', () => {
    return (
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
    );
  });
