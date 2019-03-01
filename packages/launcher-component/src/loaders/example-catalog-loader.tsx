import React from 'react';
import _ from 'lodash';

import { DataLoader } from '../core/data-loader/data-loader';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { filter, Catalog, ExampleMission } from 'launcher-client';

export function ExamplesLoader(props: {id?: string, children: (obj: {catalog: Catalog}) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(catalog => {
    if (props.id) {
      return {
        catalog: {
          missions: filter({mission: {id: '', name: '', description: ''}}, catalog) as ExampleMission[]
        }
      };
    }
    return {
      catalog
    };
  });
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}
