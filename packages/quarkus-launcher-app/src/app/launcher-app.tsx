import { LauncherDepsProvider } from 'launcher-component';
import React from 'react';
import { launcherApiUrl } from './config';
import '@patternfly/react-core/dist/styles/base.css';
import './launcher-app.scss';
import { QuarkusForm } from './quarkus-form';

export function LauncherApp() {
  return (
          <LauncherDepsProvider
            launcherUrl={launcherApiUrl}
          >
            <QuarkusForm />
          </LauncherDepsProvider>
  );
}
