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
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('BackendForm', () => {
    return (
      <BackendForm value={defaultBackendFormValue} onSave={action('save')} onCancel={action('cancel')}/>
    );
  })
  .add('FrontendForm', () => {
    return (
      <FrontendForm value={defaultFrontendFormValue} onSave={action('save')} onCancel={action('cancel')}/>
    );
  })
  .add('SrcLocationForm', () => {
    return (
      <SrcLocationForm value={defaultSrcLocationFormValue} onSave={action('save')} onCancel={action('cancel')}/>
    );
  })
  .add('ExampleForm', () => {
    return (
      <ExampleForm value={defaultExampleFormValue} onSave={action('save')} onCancel={action('cancel')}/>
    );
  })
  .add('ImportForm', () => {
    return (
      <ImportForm value={defaultImportFormValue} onSave={action('save')} onCancel={action('cancel')}/>
    );
  });
