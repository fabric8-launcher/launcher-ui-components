import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormPanel } from '../../../core/form-panel/form-panel';
import { mockLauncherClient } from 'launcher-client';

import { LauncherClientContext } from '../../../launcher-client-context';
import { OpenshiftClustersLoader } from '../../../loaders/openshiftcluster-loader';
import { ClusterPicker } from '../cluster-picker';

const client = mockLauncherClient({ creatorUrl: 'efe', launcherURL: 'eqg' });

storiesOf('Pickers', module)
  .add('ClusterPicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <OpenshiftClustersLoader>
          {result => (
            <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<ClusterPicker {...inputProps} {...result} />)}
            </FormPanel>
          )}
        </OpenshiftClustersLoader>
      </LauncherClientContext.Provider>
    );
  })
  .add('ClusterPicker: EmptyState', () => {
    return (
      <FormPanel value={{}}>
        {(inputProps) => (<ClusterPicker {...inputProps} clusters={[]} />)}
      </FormPanel>
    );
  });
