import React from 'react';
import { GitInfo } from 'launcher-client';

import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function GitInfoLoader(props: { children: (obj: GitInfo) => any }) {
  const client = useLauncherClient();
  return (
    <DataLoader loader={() => gitInfoLoader(client)}>
      {props.children}
    </DataLoader>
  );
}

export const gitInfoLoader = async (client) => {
  try {
    return await client.gitInfo();
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return Promise.resolve({} as GitInfo);
    }
    throw error;
  }
};
