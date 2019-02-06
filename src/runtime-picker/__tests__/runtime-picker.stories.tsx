import React, {useEffect, useState} from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';
import {FormPanel} from "../../form-panel/form-panel";
import {defaultRuntimePickerValue} from "../runtime-adapter";
import {RuntimePicker} from "../runtime-picker";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});


function LoadData<T>(props: { loader: Promise<T>, default: T, children: any }) {
  const [data, setData] = useState<T>(props.default);

  useEffect(() => {
    props.loader.then((d) => setData(d));
  });

  return props.children(data);

}

storiesOf('RuntimePicker', module)
  .add('default', () => {
    const itemsLoader = client.enum('runtime.name');

    return (
      <LoadData loader={itemsLoader} default={[]}>
        {items => (
          <FormPanel value={defaultRuntimePickerValue} onSave={action('save')}
                     onCancel={action('cancel')}>
            {
              (inputProps) => (<RuntimePicker {...inputProps} items={items}/>)
            }
          </FormPanel>
        )}
      </LoadData>
    );
  });
