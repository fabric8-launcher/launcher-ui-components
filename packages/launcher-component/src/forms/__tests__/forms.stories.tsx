import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BackendForm, defaultBackendFormValue } from '../backend-form';
import { defaultFrontendFormValue, FrontendForm } from '../frontend-form';
import { defaultSrcLocationFormValue, SrcLocationForm } from '../src-location-form';
import { defaultExampleFormValue, ExampleForm } from '../example-form';
import { defaultImportFormValue, ImportForm } from '../import-form';
import { LauncherClientProvider } from '../..';

storiesOf('Forms', module)
  .add('BackendForm', () => {
    return (
      <LauncherClientProvider>
        <BackendForm value={defaultBackendFormValue} onSave={action('save')} onCancel={action('cancel')} />
      </LauncherClientProvider>
    );
  })
  .add('FrontendForm', () => {
    return (
       <LauncherClientProvider>
        <FrontendForm value={defaultFrontendFormValue} onSave={action('save')} onCancel={action('cancel')} />
       </LauncherClientProvider>
    );
  })
  .add('SrcLocationForm', () => {
    return (
       <LauncherClientProvider>
        <SrcLocationForm value={defaultSrcLocationFormValue} onSave={action('save')} onCancel={action('cancel')} />
       </LauncherClientProvider>
    );
  })
  .add('ExampleForm', () => {
    return (
       <LauncherClientProvider>
        <ExampleForm value={defaultExampleFormValue} onSave={action('save')} onCancel={action('cancel')} />
       </LauncherClientProvider>
    );
  })
  .add('ImportForm', () => {
    return (
       <LauncherClientProvider>
        <ImportForm value={defaultImportFormValue} onSave={action('save')} onCancel={action('cancel')} />
       </LauncherClientProvider>
    );
  });
