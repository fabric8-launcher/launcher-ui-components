import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormPanel } from '../../core/form-panel/form-panel';
import { OpenshiftClustersLoader } from '../../loaders/openshiftcluster-loader';
import { ClusterPicker } from '../cluster-picker';
import { LauncherClientProvider } from '../..';

function authorizationLinkGenerator(id?: string) {
  if (!!id) {
    return 'http://www.authorize-cluster.com/' + id;
  }
  return 'http://www.authorize-cluster.com/';
}

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('ClusterPicker', () => {
    return (
      <OpenshiftClustersLoader>
        {clusters => (
          <FormPanel value={{}} onSave={action('save')} onCancel={action('cancel')}>
            {(inputProps) => (<ClusterPicker {...inputProps} clusters={clusters} authorizationLinkGenerator={authorizationLinkGenerator}/>)}
          </FormPanel>
        )}
      </OpenshiftClustersLoader>
    );
  })
  .add('ClusterPicker: EmptyState', () => {
    return (
      <FormPanel value={{}}>
        {(inputProps) => (<ClusterPicker {...inputProps} clusters={[]} authorizationLinkGenerator={authorizationLinkGenerator}/>)}
      </FormPanel>
    );
  });
