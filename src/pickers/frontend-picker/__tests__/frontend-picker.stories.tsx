import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';
import {FormPanel} from "../../../core/form-panel/form-panel";
import {LauncherClientContext} from "../../../launcher-client-context";
import {defaultFrontendValue, FrontendPicker, isFrontendValueValid} from "../frontend-picker";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('FrontendPicker', module)
  .add('default', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <FormPanel value={defaultFrontendValue} onSave={action('save')}
                   isValid={isFrontendValueValid}
                   onCancel={action('cancel')}>
          {
            (inputProps) => (<FrontendPicker {...inputProps}/>)
          }
        </FormPanel>
      </LauncherClientContext.Provider>
    );
  });
