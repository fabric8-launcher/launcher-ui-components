import { DataLoader } from '../core/data-loader/data-loader';
import React from 'react';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { PropertyValue } from 'launcher-client';

export function runtimeMatcherByCategory(category: string) {
  return (r) => r.metadata.categories.indexOf(category) >= 0;
}

export function RuntimeLoader(props: { id: string, children: (runtime?: PropertyValue) => any }) {
  const client = useLauncherClient();
  const loader = () => client.enum('runtime.name').then(runtimes => runtimes.find(r => r.id === props.id));
  return (
    <DataLoader loader={loader} default={undefined}>
      {props.children}
    </DataLoader>
  );
}

export function EnumsRuntimesLoaders(props: { category: string, children: (items: PropertyValue[]) => any }) {
  const client = useLauncherClient();
  const loader = () => client.enum('runtime.name').then(r => r.filter(runtimeMatcherByCategory(props.category)));
  return (
    <DataLoader loader={loader} default={[]}>
      {props.children}
    </DataLoader>
  );
}
