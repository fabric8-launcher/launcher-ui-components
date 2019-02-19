import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { mockLauncherClient } from 'launcher-client';

import { LauncherClientContext } from '../../../launcher-client-context';
import { FormPanel } from '../../../core/form-panel/form-panel';
import { GitInfoLoader } from '../../../loaders/git-info-loader';
import { defaultRepoPickerValue, isRepoPickerValueValid, RepoPicker } from '../repo-picker';

const client = mockLauncherClient({ creatorUrl: 'efe', launcherURL: 'eqg' });

storiesOf('RepoPicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <GitInfoLoader>
          {gitInfo => (
            <FormPanel value={defaultRepoPickerValue} onSave={action('save')} onCancel={action('cancel')} isValid={isRepoPickerValueValid}>
              {(inputProps) => (<RepoPicker {...inputProps} gitInfo={gitInfo}/>)}
            </FormPanel>
          )}
        </GitInfoLoader>
      </LauncherClientContext.Provider>
    );
  });
