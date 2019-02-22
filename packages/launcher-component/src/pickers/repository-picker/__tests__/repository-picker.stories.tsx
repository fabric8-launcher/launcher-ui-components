import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { mockLauncherClient } from 'launcher-client';

import { LauncherClientContext } from '../../../contexts/launcher-client-context';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { GitInfoLoader } from '../../../loaders/git-info-loader';
import { defaultRepoPickerValue, isRepositoryPickerValueValid, RepositoryPicker } from '../repository-picker';

const client = mockLauncherClient({ creatorUrl: 'efe', launcherURL: 'eqg' });

storiesOf('Pickers', module)
  .add('RepositoryPicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <GitInfoLoader>
          {gitInfo => (
            <FormPanel
              value={defaultRepoPickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
              isValid={isRepositoryPickerValueValid}
            >
              {(inputProps) => (<RepositoryPicker {...inputProps} gitInfo={gitInfo} />)}
            </FormPanel>
          )}
        </GitInfoLoader>
      </LauncherClientContext.Provider>
    );
  })
  .add('RepositoryPicker: import', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <GitInfoLoader>
          {gitInfo => (
            <FormPanel
              value={defaultRepoPickerValue}
              onSave={action('save')}
              onCancel={action('cancel')}
              isValid={isRepositoryPickerValueValid}
            >
              {(inputProps) => (<RepositoryPicker {...inputProps} gitInfo={gitInfo} import={true} />)}
            </FormPanel>
          )}
        </GitInfoLoader>
      </LauncherClientContext.Provider>
    );
  });
