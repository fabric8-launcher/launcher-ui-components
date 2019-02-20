import React from 'react';
import * as _ from 'lodash';
import { ExampleMission, ExampleRuntime, filter } from 'launcher-client';
import { useLauncherClient } from '../../launcher-client-context';
import { DataLoader } from '../../core/data-loader/data-loader';

interface ExampleData {
  missions: ExampleMission[];
  runtimes: ExampleRuntime[];
  runtimesMap: { [name: string]: ExampleRuntime[] };
}

export function ExamplesLoader(props: {children: (obj: ExampleData) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(catalog => {
    const runtimesMap = _.keyBy(filter({runtime: {id: '', name: '', version: ''}}, catalog), 'id');
    return {
      missions: catalog.missions,
      runtimes: _.map(runtimesMap),
      runtimesMap
    };
  });
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}
