import * as React from 'react';
import { useState } from 'react';
import { HubNSpoke } from '../core/hub-n-spoke';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { ProcessingApp } from '../misc/processing-app';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { StatusMessage } from 'launcher-client';
import _ from 'lodash';
import { toExamplePayload } from './launcher-client-adapters';
import { ExampleFormOverview } from '../forms/example-form-overview';
import { ExamplePickerValue } from '../pickers/example-picker/example-picker';
import { defaultExampleFormValue, ExampleForm, isExampleFormValueValid } from '../forms/example-form';

enum Status {
  EDITION = 'EDITION', RUNNING = 'RUNNING', COMPLETED = 'COMPLETED', ERROR = 'ERROR'
}

interface ExampleApp {
  example: ExamplePickerValue;
  srcLocation: SrcLocationFormValue;
}

const defaultCustomApp = {
  example: defaultExampleFormValue,
  srcLocation: {
    repository: { name: 'my-app-' + _.random(1, 1000) }
  },
};

interface RunState {
  status: Status;
  result?: any;
  error?: any;
  statusMessages: StatusMessage[];
}

export function CreateExampleAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<ExampleApp>(defaultCustomApp);
  const [run, setRun] = useState<RunState>({ status: Status.EDITION, statusMessages: []});
  const client = useLauncherClient();

  const items = [
    {
      id: 'example',
      title: 'Example',
      overview: {
        component: ({edit}) => (
          <ExampleFormOverview value={app.example} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <ExampleForm
            value={app.example}
            onSave={(example) => {
              setApp({...app, example});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: 'srcLocation',
      title: 'Source Location',
      overview: {
        component: ({edit}) => (
          <SrcLocationFormOverview value={app.srcLocation} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <SrcLocationForm
            value={app.srcLocation}
            onSave={(srcLocation) => {
              setApp({...app, srcLocation});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    }
  ];

  const launch = () => {
    if (!isExampleFormValueValid(app.example)) {
      console.warn('impossible to create an empty app');
      return;
    }

    setRun({ status: Status.RUNNING, statusMessages: [] });

    client.launch(toExamplePayload(app)).then((result) => {
      setRun((prev) => ({ ...prev, result }));
      client.follow(result.id, result.events, {
        onMessage: (statusMessages) => {
          console.log(statusMessages);
          setRun((prev) => ({ ...prev, statusMessages: [...prev.statusMessages, statusMessages]  }));
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
    <Toolbar style={{marginTop: '20px'}}>
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
      {run.status === Status.EDITION && (<HubNSpoke items={items} toolbar={toolbar}/>)}
      {run.status === Status.RUNNING && (<ProcessingApp progressEvents={progressEvents} progressEventsResults={progressEventsResults} />)}
      {(run.status === Status.COMPLETED || run.status === Status.ERROR) && (<LaunchNextSteps error={run.error}/>)}
    </React.Fragment>
  );

}
