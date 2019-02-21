import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormPanel } from '../../../core/form-panel/form-panel';
import { mockLauncherClient } from 'launcher-client';

import { LauncherClientContext } from '../../../contexts/launcher-client-context';
import { OpenshiftClustersLoader } from '../../../loaders/openshiftcluster-loader';
import { ClusterPicker } from '../cluster-picker';

const client = mockLauncherClient({ creatorUrl: 'efe', launcherURL: 'eqg' });

function authorizationLinkGenerator(id?: string) {
  if (!!id) {
    return 'http://www.authorize-cluster.com/' + id;
  }
  return 'http://www.authorize-cluster.com/';
}

storiesOf('Pickers', module)
  .add('ClusterPicker', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <OpenshiftClustersLoader>
          {result => (
            <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
              {(inputProps) => (<ClusterPicker {...inputProps} {...result} authorizationLinkGenerator={authorizationLinkGenerator} />)}
            </FormPanel>
          )}
        </OpenshiftClustersLoader>
      </LauncherClientContext.Provider>
    );
  })
  .add('ClusterPicker: EmptyState', () => {
    return (
      <FormPanel value={{}}>
        {(inputProps) => (<ClusterPicker {...inputProps} clusters={[]} authorizationLinkGenerator={authorizationLinkGenerator} />)}
      </FormPanel>
    );
  });
