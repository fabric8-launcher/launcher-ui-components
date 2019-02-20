import React from 'react';
import { Catalog } from 'launcher-client';
import { useLauncherClient } from '../launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function ExamplesLoader(props: {children: (obj: {catalog: Catalog}) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(catalog => {
    return {
      catalog
    };
  });
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}
