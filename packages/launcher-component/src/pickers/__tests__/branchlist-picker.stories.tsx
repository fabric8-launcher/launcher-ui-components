import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';

import { UrlBranchLoader } from '../../loaders/buildimage-loader';
import { BranchListPicker } from '../branchlist-picker';
import { LauncherClientProvider } from '../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('BranchListPicker', () => {
    return (
      <UrlBranchLoader gitUrl="https://github.com/fabric8-launcher/launcher-frontend">
        {result => (
          <FormPanel
            initialValue={{}}
            validator={BranchListPicker.checkCompletion}
            onSave={action('save')}
            onCancel={action('cancel')}
          >
            {
              (inputProps) => (
                <BranchListPicker.Element {...inputProps} {...result}/>
              )}
          </FormPanel>
        )}
      </UrlBranchLoader>
    );
  });
