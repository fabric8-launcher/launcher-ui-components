import React, {useEffect, useState} from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {SelectCapabilities} from "../select-capabilities";
import {action} from "@storybook/addon-actions";
import {mockLauncherClient, propsWithValuesMapper} from 'launcher-client';
import {capabilityToItem} from "../capabilities-adapter";


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});


function LoadData<T>(props: { loader: Promise<T>, default: T, children: any }) {
  const [data, setData] = useState<T>(props.default);

  useEffect(() => {
    props.loader.then((d) => setData(d));
  });

  return props.children(data);

};

storiesOf('SelectCapabilities', module)
  .add('default', () => {
    const itemsLoader = client.capabilities().then(c => {
      return client.enums().then(e => {
        return c.map(propsWithValuesMapper(e))
          .map(capabilityToItem)
          .filter(c => c.category !== 'frontend');
      });
    });

    return (
      <LoadData loader={itemsLoader} default={[]}>
        {items => (<SelectCapabilities items={items} onSave={action('save')} onCancel={action('cancel')}/>)}
      </LoadData>
    );
  });
