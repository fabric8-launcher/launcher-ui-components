import React from 'react';

import { DataLoader } from '../core/data-loader/data-loader';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { AnyExample, constructModel, filter, ExampleMission, Catalog } from 'launcher-client';

export function ExamplesLoaderWithFilter(props: { query: { missionId?: string, runtimeId?: string }, children: (obj: AnyExample) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(catalog => {
    const anyExamples = filter({mission: {id: props.query.missionId, name: '', runtime: {id: props.query.runtimeId, icon: ''}}}, catalog);
    return anyExamples[0];
  });
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}

export function ExamplesLoader(props: { children: (obj: {catalog: Catalog, missions: ExampleMission[]}) => any }) {
  const client = useLauncherClient();
  const itemsLoader = async () => {
    const catalog= await client.exampleCatalog();
    return {
      catalog,
      missions: constructModel(catalog)
    };
  };
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}
