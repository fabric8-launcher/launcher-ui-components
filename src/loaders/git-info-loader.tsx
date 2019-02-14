import React from 'react';
import { GitInfo } from 'launcher-client';

import { useLauncherClient } from '../launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function GitInfoLoader(props: {children: (obj: GitInfo) => any }) {
  const client = useLauncherClient();
  const loader = () => client.gitInfo({});
  return (
    <DataLoader loader={loader} default={{}} >
      {props.children}
    </DataLoader>
  );
}
