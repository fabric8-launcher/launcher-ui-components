import React from 'react';
import { AnalyzeResult } from 'launcher-client';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function BuildImageAnalyzerLoader(props: { repository: {org: string, name: string}, children: (result: AnalyzeResult) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.importAnalyze(toRepoUrl(props.repository));
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}

function toRepoUrl(repository: { org: string; name: string; }) {
  return `https://github.com/${repository.org}/${repository.name}`;
}
