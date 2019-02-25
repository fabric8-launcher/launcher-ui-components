import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { mockLauncherClient } from 'launcher-client';
import { LauncherClientContext } from '../../contexts/launcher-client-context';
import { BackendForm, defaultBackendFormValue } from '../backend-form';
import { defaultFrontendFormValue, FrontendForm } from '../frontend-form';
import { defaultSrcLocationFormValue, SrcLocationForm } from '../src-location-form';
import { ExampleForm, defaultExampleFormValue } from '../example-form';
import { defaultImportFormValue, ImportForm } from '../import-form';

const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('Forms', module)
  .add('BackendForm', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <BackendForm value={defaultBackendFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientContext.Provider>
    );
  })
  .add('FrontendForm', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <FrontendForm value={defaultFrontendFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientContext.Provider>
    );
  })
  .add('SrcLocationForm', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <SrcLocationForm value={defaultSrcLocationFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientContext.Provider>
    );
  })
  .add('ExampleForm', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ExampleForm value={defaultExampleFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientContext.Provider>
    );
  })
  .add('ImportForm', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <ImportForm value={defaultImportFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientContext.Provider>
    );
  });
