import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient, propsWithValuesMapper} from 'launcher-client';
import {capabilityToItem, defaultCapabilitiesPickerValue} from "../capabilities-adapter";
import {CapabilitiesPicker} from "../capabilities-picker";
import {FormPanel} from "../../../core/form-panel/form-panel";
import {DataLoader} from "../../../core/data-loader/data-loader";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('CapabilitiesPicker', module)
  .add('default', () => {
    const itemsLoader = client.capabilities().then(c => {
      return client.enums().then(e => {
        return c.map(propsWithValuesMapper(e))
          .map(capabilityToItem)
          .filter(c => c.category !== 'frontend');
      });
    });

    return (
      <DataLoader loader={() => itemsLoader} default={[]}>
        {items => (
          <FormPanel value={defaultCapabilitiesPickerValue} onSave={action('save')}
                     onCancel={action('cancel')}>
            {
              (inputProps) => (<CapabilitiesPicker {...inputProps} items={items}/>)
            }
          </FormPanel>
        )}
      </DataLoader>
    );
  });
