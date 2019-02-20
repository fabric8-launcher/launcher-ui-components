import React from 'react';
import { OpenShiftCluster } from 'launcher-client';
import { useLauncherClient } from '../launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function OpenshiftClustersLoader(props: {children: (obj: {clusters: OpenShiftCluster[]}) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.ocClusters().then(clusters => {
    return {
      clusters
    };
  });
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}
