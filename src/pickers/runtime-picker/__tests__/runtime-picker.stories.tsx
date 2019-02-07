import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';
import {FormPanel} from "../../../core/form-panel/form-panel";
import {defaultRuntimePickerValue} from "../runtime-adapter";
import {RuntimePicker} from "../runtime-picker";
import {DataLoader} from "../../../core/data-loader/data-loader";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});

storiesOf('RuntimePicker', module)
  .add('default', () => {
    return (
      <DataLoader loader={() => client.enum('runtime.name')} default={[]}>
        {items => (
          <FormPanel value={defaultRuntimePickerValue} onSave={action('save')}
                     onCancel={action('cancel')}>
            {
              (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)
            }
          </FormPanel>
        )}
      </DataLoader>
    );
  });
