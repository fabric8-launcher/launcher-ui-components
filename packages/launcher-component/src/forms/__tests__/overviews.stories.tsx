import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { mockLauncherClient } from 'launcher-client';
import { LauncherClientContext } from '../../contexts/launcher-client-context';
import { BackendFormOverview } from '../backend-form-overview';
import { defaultBackendFormValue } from '../backend-form';
import { action } from '@storybook/addon-actions';
import { FrontendFormOverview } from '../frontend-form-overview';
import { defaultFrontendFormValue } from '../frontend-form';
import { ImportFormOverview } from '../import-form-overview';
import { defaultImportFormValue } from '../import-form';
import { ExampleFormOverview } from '../example-form-overview';
import { defaultExampleFormValue } from '../example-form';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Overviews', module)
  .add('BackendOverview: empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <BackendFormOverview value={defaultBackendFormValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('BackendOverview: selected', () => {

    const value = {
      runtime: {
        id: 'vertx'
      },
      capabilities: [
        {id: 'welcome', selected: true},
        {id: 'database', selected: true}
      ],
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <BackendFormOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('FrontendOverview: empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <FrontendFormOverview value={defaultFrontendFormValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('FrontendOverview: selected', () => {

    const value = {
      runtime: {
        id: 'react'
      }
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <FrontendFormOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('ExampleOverview: empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ExampleFormOverview value={defaultExampleFormValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('ExampleOverview: selected', () => {

    const value = {
      missionId: 'crud',
      runtimeId: 'vert.x',
      versionId: 'community'
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <ExampleFormOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('ImportOverview: empty', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ImportFormOverview value={defaultImportFormValue} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  })
  .add('ImportOverview: selected', () => {

    const value = {
      repository: { name: 'bayonne', org: 'jean-bon'},
      buildImage: { imageName: 'Java Code Builder' }
    };

    return (
      <LauncherClientContext.Provider value={client}>
        <ImportFormOverview value={value} onClick={action('overview')}/>
      </LauncherClientContext.Provider>
    );
  });
