import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';

import { BuildImageAnalyzerLoader } from '../../loaders/buildimage-loader';
import { BuildImagePicker } from '../buildimage-picker';
import { LauncherClientProvider } from '../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('BuildImagePicker', () => {
    return (
      <BuildImageAnalyzerLoader gitUrl="https://github.com/fabric8-launcher/launcher-frontend">
        {result => (
          <FormPanel
            initialValue={{}}
            validator={BuildImagePicker.checkCompletion}
            onSave={action('save')}
            onCancel={action('cancel')}
          >
            {
              (inputProps) => (<BuildImagePicker.Element {...inputProps} result={result}/>)}
          </FormPanel>
        )}
      </BuildImageAnalyzerLoader>
    );
  });
