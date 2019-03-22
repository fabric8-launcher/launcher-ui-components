import React from 'react';
import { GitInfo } from 'launcher-client';

import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function GitInfoLoader(props: { children: (obj: GitInfo) => any }) {
  const client = useLauncherClient();
  const loader = async () => {
    try {
      return await client.gitInfo();
    } catch (error) {
      return Promise.resolve({} as GitInfo);
    }
  };
  return (
    <DataLoader loader={loader}>
      {props.children}
    </DataLoader>
  );
}
