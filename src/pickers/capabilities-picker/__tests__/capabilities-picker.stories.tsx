import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';
import {CapabilitiesPicker, defaultCapabilitiesPickerValue} from "../capabilities-picker";
import {FormPanel} from "../../../core/form-panel/form-panel";
import {CapabilitiesItemsLoader} from "../capability-loader";
import {LauncherClientContext} from "../../../launcher-client-context";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('CapabilitiesPicker', module)
  .add('backend', () => {
    return (
      <LauncherClientContext.Provider value={client}>
        <CapabilitiesItemsLoader categories={['backend', 'support']}>
          {items => (
            <FormPanel value={defaultCapabilitiesPickerValue} onSave={action('save')}
                       onCancel={action('cancel')}>
              {
                (inputProps) => (<CapabilitiesPicker {...inputProps} items={items}/>)
              }
            </FormPanel>
          )}
        </CapabilitiesItemsLoader>
      </LauncherClientContext.Provider>
    );
  });
