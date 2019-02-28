import React from 'react';
import { OpenShiftCluster } from 'launcher-client';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function OpenshiftClustersLoader(props: {children: (obj: OpenShiftCluster[]) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.ocClusters().then(clusters => {
    return clusters;
  });
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}

export function OpenshiftClusterLoader(props: {clusterId: string, children: (obj?: OpenShiftCluster) => any }) {
  const client = useLauncherClient();
  const itemsLoader = async () => {
    const clusters = await client.ocClusters();
    return clusters.find(c => c.id === props.clusterId);
  };
  return (
    <DataLoader loader={itemsLoader} default={undefined} >
      {props.children}
    </DataLoader>
  );
}
