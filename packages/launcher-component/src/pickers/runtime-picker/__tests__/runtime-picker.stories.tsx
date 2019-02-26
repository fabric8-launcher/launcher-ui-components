import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { defaultRuntimePickerValue, RuntimePicker } from '../runtime-picker';
import { EnumsRuntimesLoaders } from '../../../loaders/enums-runtimes-loaders';
import { LauncherClientProvider } from '../../..';

storiesOf('Pickers', module)
  .add('RuntimePicker: frontend', () => {
    return (
      <LauncherClientProvider>
        <EnumsRuntimesLoaders category="frontend">
          {items => (
            <FormPanel
              value={defaultRuntimePickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
            >
              {
                (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)}
            </FormPanel>
          )}
        </EnumsRuntimesLoaders>
      </LauncherClientProvider>
    );
  })
  .add('RuntimePicker: backend', () => {
    return (
      <LauncherClientProvider>
        <EnumsRuntimesLoaders category="backend">
          {items => (
            <FormPanel
              value={defaultRuntimePickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
            >
              {
                (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)}
            </FormPanel>
          )}
        </EnumsRuntimesLoaders>
      </LauncherClientProvider>
    );
  });
