import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { defaultRuntimePickerValue, RuntimePicker } from '../runtime-picker';
import { EnumsRuntimesLoaders } from '../../../loaders/enums-runtimes-loaders';
import { LauncherClientProvider } from '../../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('RuntimePicker: frontend', () => {
    return (
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
    );
  })
  .add('RuntimePicker: backend', () => {
    return (
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
    );
  });
