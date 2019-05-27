import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';
import { LauncherDepsProvider } from '../..';

import { QuarkusDependencyLoader } from '../../loaders/quarkus-dependency-loader';
import { DependenciesPicker } from '../dependencies-picker';

storiesOf('Pickers', module)
  .addDecorator((storyFn) => (
    <LauncherDepsProvider>
      {storyFn()}
    </LauncherDepsProvider>
  ))
  .add('DependenciesPicker', () => {
    return (
      <QuarkusDependencyLoader>
        {dependencies => (
          <FormPanel
            initialValue={{}}
            validator={DependenciesPicker.checkCompletion}
            onSave={action('save')}
            onCancel={action('cancel')}
          >
            {
              (inputProps) => (<DependenciesPicker.Element {...inputProps} items={dependencies}/>)}
          </FormPanel>
        )}
      </QuarkusDependencyLoader>
    );
  });