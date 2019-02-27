import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { BackendFormOverview } from '../backend-form-overview';
import { defaultBackendFormValue } from '../backend-form';
import { action } from '@storybook/addon-actions';
import { FrontendFormOverview } from '../frontend-form-overview';
import { defaultFrontendFormValue } from '../frontend-form';
import { ImportFormOverview } from '../import-form-overview';
import { defaultImportFormValue } from '../import-form';
import { ExampleFormOverview } from '../example-form-overview';
import { defaultExampleFormValue } from '../example-form';
import { LauncherClientProvider } from '../..';

storiesOf('Overviews', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('BackendOverview: empty', () => {
    return (
      <BackendFormOverview value={defaultBackendFormValue} onClick={action('overview')}/>
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
      <BackendFormOverview value={value} onClick={action('overview')}/>
    );
  })
  .add('FrontendOverview: empty', () => {
    return (
      <FrontendFormOverview value={defaultFrontendFormValue} onClick={action('overview')}/>
    );
  })
  .add('FrontendOverview: selected', () => {

    const value = {
      runtime: {
        id: 'react'
      }
    };

    return (
      <FrontendFormOverview value={value} onClick={action('overview')}/>
    );
  })
  .add('ExampleOverview: empty', () => {
    return (
      <ExampleFormOverview value={defaultExampleFormValue} onClick={action('overview')}/>
    );
  })
  .add('ExampleOverview: selected', () => {

    const value = {
      missionId: 'crud',
      runtimeId: 'vert.x',
      versionId: 'community'
    };

    return (
      <ExampleFormOverview value={value} onClick={action('overview')}/>
    );
  })
  .add('ImportOverview: empty', () => {
    return (
      <ImportFormOverview value={defaultImportFormValue} onClick={action('overview')}/>
    );
  })
  .add('ImportOverview: selected', () => {

    const value = {
      repository: {name: 'bayonne', org: 'jean-bon'},
      buildImage: {imageName: 'Java Code Builder'}
    };

    return (
      <ImportFormOverview value={value} onClick={action('overview')}/>
    );
  });
