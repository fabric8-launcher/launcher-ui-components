import React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { mockLauncherClient } from "launcher-client";

import { LauncherClientContext } from "../../../launcher-client-context";
import { FormPanel } from "../../../core/form-panel/form-panel";
import { RepoLoader } from '../repo-loader';
import { RepoPicker } from "../repo-picker";

const client = mockLauncherClient({ creatorUrl: 'efe', launcherURL: 'eqg' });

storiesOf('RepoPicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <RepoLoader>
          {gitInfo => (
            <FormPanel value={{repo: ''}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<RepoPicker {...inputProps} gitInfo={gitInfo}/>)}
            </FormPanel>
          )}
        </RepoLoader>
      </LauncherClientContext.Provider>
    );
  });
