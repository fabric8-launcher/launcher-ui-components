import * as React from 'react';
import { useState } from 'react';
import _ from 'lodash';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { StatusMessage } from 'launcher-client';

import { HubNSpoke } from '../core/hub-n-spoke';
import { ProcessingApp } from '../misc/processing-app';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { toImportAppPayload } from './launcher-client-adapters';
import { ImportFormValue, ImportForm, isImportFormValueValid } from '../forms/import-form';
import { defaultBuidImagePickerValue } from '../pickers/buildimage-picker/buildimage-picker';
import { ImportFormOverview } from '../forms/import-form-overview';
import { defaultRepoPickerValue } from '../pickers/repository-picker/repository-picker';

enum Status {
  EDITION = 'EDITION', RUNNING = 'RUNNING', COMPLETED = 'COMPLETED', ERROR = 'ERROR'
}

interface CustomApp {
  importApp: ImportFormValue;
}

const defaultCustomApp = {
  importApp: {
    repository: defaultRepoPickerValue,
    buildImage: defaultBuidImagePickerValue
  },
};

interface RunState {
  status: Status;
  result?: any;
  error?: any;
  statusMessages: StatusMessage[];
}

export function ImportExistingFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);
  const [run, setRun] = useState<RunState>({ status: Status.EDITION, statusMessages: [] });
  const client = useLauncherClient();

  const items = [
    {
      id: 'import',
      title: 'Import',
      overview: {
        component: ({ edit }) => (
          <ImportFormOverview value={app.importApp} onClick={edit} />
        ),
      },
      form: {
        component: ({ close }) => (
          <ImportForm
            value={app.importApp}
            onSave={(importApp) => {
              setApp({ ...app, importApp });
              close();
            }}
            onCancel={close}
          />
        ),
      }
    }
  ];

  const launch = () => {
    if (!isImportFormValueValid(app.importApp)) {
      console.warn('impossible to create an empty app');
      return;
    }

    setRun({ status: Status.RUNNING, statusMessages: [] });

    client.launch(toImportAppPayload(app)).then((result) => {
      setRun((prev) => ({ ...prev, result }));
      client.follow(result.id, result.events, {
        onMessage: (statusMessages) => {
          console.log(statusMessages);
          setRun((prev) => ({ ...prev, statusMessages: [...prev.statusMessages, statusMessages] }));
        },
        onComplete: () => {
          setRun((prev) => ({ ...prev, status: Status.COMPLETED }));
        },
        onError: (error) => {
          setRun((prev) => ({ ...prev, status: Status.ERROR, error }));
        }
      });
    });
  };

  const toolbar = (
    <Toolbar style={{ marginTop: '20px' }}>
      <ToolbarGroup>
        <Button variant="primary" onClick={launch}>Launch</Button>
      </ToolbarGroup>
      <ToolbarGroup>
        <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
      </ToolbarGroup>
    </Toolbar>
  );

  const progressEvents = run.status === Status.RUNNING && run.result && run.result.events;
  const progressEventsResults = run.status === Status.RUNNING && run.result && run.statusMessages;

  console.log(run);
  return (
    <React.Fragment>
      {run.status === Status.EDITION && (<HubNSpoke items={items} toolbar={toolbar} />)}
      {run.status === Status.RUNNING && (<ProcessingApp progressEvents={progressEvents} progressEventsResults={progressEventsResults} />)}
      {(run.status === Status.COMPLETED || run.status === Status.ERROR) && (<LaunchNextSteps error={run.error} />)}
    </React.Fragment>
  );

}
