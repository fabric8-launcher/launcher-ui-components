import React, { useState } from 'react';
import { checkNotNull } from 'launcher-client/dist/client/helpers/preconditions';
import { LauncherClientContext } from './launcher-client-context';
import { defaultLauncherClient, LauncherClient, mockLauncherClient } from 'launcher-client';

interface LauncherClientProviderProps {
  children: React.ReactNode;
  creatorUrl?: string;
  launcherUrl?: string;
  authorizationToken?: string;
}

function buildLauncherClient(props: LauncherClientProviderProps) {
  let client: LauncherClient;
  if (!!props.creatorUrl || !!props.launcherUrl) {
    checkNotNull(props.launcherUrl, 'launcherUrl');
    checkNotNull(props.creatorUrl, 'creatorUrl');
    client = defaultLauncherClient({creatorUrl: props.creatorUrl!, launcherURL: props.launcherUrl!});
  } else {
    client = mockLauncherClient({creatorUrl: 'http://www.launcher-mock.org/creator', launcherURL: 'http://www.launcher-mock.org/launcher'});
  }
  return client;
}

export function LauncherClientProvider(props: LauncherClientProviderProps) {
  const [client] = useState<LauncherClient>(buildLauncherClient(props));

  client.authorizationToken = props.authorizationToken;

  return (
    <LauncherClientContext.Provider value={client}>
      {props.children}
    </LauncherClientContext.Provider>
  );
}
