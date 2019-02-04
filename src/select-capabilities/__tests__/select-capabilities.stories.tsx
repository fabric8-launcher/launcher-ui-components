import React, {useEffect, useState} from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {SelectCapabilities} from "../select-capabilities";
import {action} from "@storybook/addon-actions";
import {mockLauncherClient} from 'launcher-client';


const client = mockLauncherClient({creatorUrl: 'efe', launcherURL: 'eqg'});


function LoadData<T>(props: { loader: Promise<T>, default: T, children: any }) {
  const [data, setData] = useState<T>(props.default);

  useEffect(() => {
    props.loader.then((d) => setData(d));
  });

  return props.children(data);

};

storiesOf('SelectCapabilities', module)
  .add('simple', () => {

    const capabilities = client.capabilities().then(c => {
      return client.enums().then(e => {
        return c.map(c => {
          const fields = c.props.map(p => {
            return {
              ...p,
              values: e[p.id],
            }
          });
          return {
            id: c.module,
            name: c.name,
            description: c.description,
            category: c.metadata.category,
            icon: c.metadata.icon,
            fields: fields,
            selected: c.module === 'welcome',
            disabled: c.module === 'welcome'
          };
        }).filter(c => c.category !== 'frontend');
      });
    });

    return (
      <LoadData loader={capabilities} default={[]}>
        {items => (<SelectCapabilities items={items} onSave={action('sav' +
          '$e')} onCancel={action('cancel')}/>)}
      </LoadData>
    );
  });
