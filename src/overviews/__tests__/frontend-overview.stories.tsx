import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {mockLauncherClient} from 'launcher-client';
import {LauncherClientContext} from "../../launcher-client-context";
import {action} from '@storybook/addon-actions';
import {FrontendOverview} from '../frontend-overview';
import {defaultFrontendPickerValue} from '../../pickers/frontend-picker/frontend-picker';


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('FrontendOverview', module)
  .add('empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <FrontendOverview value={defaultFrontendPickerValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('selected', () => {

    const value = {
      runtime: {
        id: 'react'
      }
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <FrontendOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  });
