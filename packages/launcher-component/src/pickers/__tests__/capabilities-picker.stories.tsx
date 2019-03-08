import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CapabilitiesPicker, defaultCapabilitiesPickerValue } from '../capabilities-picker';
import { FormPanel } from '../../core/form-panel/form-panel';
import { CapabilitiesLoader, capabilityToItem } from '../../loaders/capabilities-loader';
import { LauncherClientProvider } from '../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('CapabilitiesPicker', () => {
    return (
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
    );
  });
