import React from 'react';
import { AnalyzeResult } from 'launcher-client';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function BuildImageAnalyzerLoader(props: { gitUrl: string, children: (result: AnalyzeResult) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.importAnalyze(props.gitUrl);
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}
