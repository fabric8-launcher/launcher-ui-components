import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';
import {FormPanel} from "../../../core/form-panel/form-panel";
import {defaultRuntimePickerValue, RuntimePicker} from "../runtime-picker";
import {EnumsRuntimesLoader} from "../enums-runtimes-loader";
import {LauncherClientContext} from "../../../launcher-client-context";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('RuntimePicker', module)
  .add('frontend', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <EnumsRuntimesLoader category="frontend">
          {items => (
            <FormPanel value={defaultRuntimePickerValue} onSave={action('save')}
                       onCancel={action('cancel')}>
              {
                (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)
              }
            </FormPanel>
          )}
        </EnumsRuntimesLoader>
      </LauncherClientContext.Provider>

    );
  })
  .add('backend', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <EnumsRuntimesLoader category="backend">
          {items => (
            <FormPanel value={defaultRuntimePickerValue} onSave={action('save')}
                       onCancel={action('cancel')}>
              {
                (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)
              }
            </FormPanel>
          )}
        </EnumsRuntimesLoader>
      </LauncherClientContext.Provider>

    );
  });
