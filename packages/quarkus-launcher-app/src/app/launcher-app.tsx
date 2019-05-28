import React from 'react';
import { LauncherDepsProvider } from 'launcher-component';
import { launcherApiUrl } from './config';
import { LaunchFlow } from './launch-flow';

import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';

export function LauncherApp() {
  return (
    <LauncherDepsProvider
      launcherUrl={launcherApiUrl}
    >
      <LaunchFlow />
    </LauncherDepsProvider>
  );
}
