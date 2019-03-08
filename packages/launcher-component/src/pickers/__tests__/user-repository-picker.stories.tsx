import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';
import { GitInfoLoader } from '../../loaders/git-info-loader';
import { defaultRepoPickerValue, isUserRepositoryPickerValueValid, UserRepositoryPicker } from '../user-repository-picker';
import { LauncherClientProvider } from '../..';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('UserRepositoryPicker', () => {
    return (
      <GitInfoLoader>
        {gitInfo => (
          <FormPanel
            value={defaultRepoPickerValue}
            onSave={action('save')}
            onCancel={action('cancel')}
            isValid={isUserRepositoryPickerValueValid}
          >
            {(inputProps) => (<UserRepositoryPicker {...inputProps} gitInfo={gitInfo}/>)}
          </FormPanel>
        )}
      </GitInfoLoader>
    );
  })
  .add('UserRepositoryPicker: import', () => {
    return (
      <GitInfoLoader>
        {gitInfo => (
          <FormPanel
            value={defaultRepoPickerValue}
            onSave={action('save')}
            onCancel={action('cancel')}
            isValid={isUserRepositoryPickerValueValid}
          >
            {(inputProps) => (<UserRepositoryPicker {...inputProps} gitInfo={gitInfo} import={true}/>)}
          </FormPanel>
        )}
      </GitInfoLoader>
    );
  });
