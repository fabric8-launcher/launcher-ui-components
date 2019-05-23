import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';
import { LauncherDepsProvider } from '../..';

import { QuarkusDependencyLoader } from '../../loaders/quarkus-dependency-loader';
import { QuarkusDependencyPicker } from '../quarkus-dependency-picker';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherDepsProvider>
      {storyFn()}
    </LauncherDepsProvider>
  ))
  .add('QuarkusDependencyPicker', () => {
    return (
      <QuarkusDependencyLoader>
        {dependencies => (
          <FormPanel
            initialValue={{}}
            validator={QuarkusDependencyPicker.checkCompletion}
            onSave={action('save')}
            onCancel={action('cancel')}
          >
            {
              (inputProps) => (<QuarkusDependencyPicker.Element {...inputProps} items={dependencies}/>)}
          </FormPanel>
        )}
      </QuarkusDependencyLoader>
    );
  });