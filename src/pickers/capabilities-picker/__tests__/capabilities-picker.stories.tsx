import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { mockLauncherClient } from 'launcher-client';
import { CapabilitiesPicker, defaultCapabilitiesPickerValue } from '../capabilities-picker';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { CapabilitiesLoader, capabilityToItem } from '../../../loaders/capabilities-loader';
import { LauncherClientContext } from '../../../launcher-client-context';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Pickers', module)
  .add('CapabilitiesPicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <CapabilitiesLoader categories={['backend', 'support']}>
          {capabilities => (
            <FormPanel
              value={defaultCapabilitiesPickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
            >
              {
                (inputProps) => (<CapabilitiesPicker {...inputProps} items={capabilities.map(capabilityToItem)}/>)}
            </FormPanel>
          )}
        </CapabilitiesLoader>
      </LauncherClientContext.Provider>
    );
  });
