import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {mockLauncherClient} from 'launcher-client';
import {LauncherClientContext} from "../../launcher-client-context";
import {BackendOverview} from '../backend-overview';
import {defaultBackendPickerValue} from '../../pickers/backend-picker/backend-picker';
import {action} from '@storybook/addon-actions';


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('BackendOverview', module)
  .add('empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <BackendOverview value={defaultBackendPickerValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('selected', () => {

    const value = {
      runtime: {
        id: 'vertx'
      },
      capabilities: [
        {id: 'welcome', selected: true}
      ],
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <BackendOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  });
