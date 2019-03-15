import React from 'react';
import _ from 'lodash';

import { DataLoader } from '../core/data-loader/data-loader';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { filter } from 'launcher-client';

export function ExamplesLoader(props: { query?: { missionId?: string, runtimeId?: string }, children: (obj: any) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(catalog => {
    if (props.query) {
      return filter({mission: {id: props.query.missionId, name: '', runtime: {id: props.query.runtimeId, icon: ''}}}, catalog)[0];
    }
    return catalog;
  });
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}
