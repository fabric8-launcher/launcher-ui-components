import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { mockLauncherClient } from 'launcher-client';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { LauncherClientContext } from '../../../launcher-client-context';
import { defaultFrontendPickerValue, FrontendPicker, isFrontendPickerValueValid } from '../frontend-picker';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('FrontendPicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <FormPanel value={defaultFrontendPickerValue} onSave={action('save')}
                   isValid={isFrontendPickerValueValid}
                   onCancel={action('cancel')}>
          {
            (inputProps) => (<FrontendPicker {...inputProps}/>)}
        </FormPanel>
      </LauncherClientContext.Provider>
    );
  });
