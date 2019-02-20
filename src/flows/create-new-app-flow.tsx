import * as React from 'react';
import { useState } from 'react';
import { BackendForm, BackendFormValue, defaultBackendFormValue, isBackendFormValueValid, } from '../forms/backend-form';
import { defaultFrontendFormValue, FrontendForm, FrontendFormValue, isFrontendFormValueValid, } from '../forms/frontend-form';
import { HubNSpoke } from '../core/hub-n-spoke';
import { BackendFormOverview } from '../forms/backend-form-overview';
import { FrontendFormOverview } from '../forms/frontend-form-overview';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { ProcessingApp } from '../misc/processing-app';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { StatusMessage } from 'launcher-client';
import _ from 'lodash';

enum Status {
  EDITION = 'EDITION', RUNNING = 'RUNNING', COMPLETED = 'COMPLETED', ERROR = 'ERROR'
}

interface CustomApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  srcLocation: SrcLocationFormValue;
}

const defaultCustomApp = {
  backend: defaultBackendFormValue,
  frontend: defaultFrontendFormValue,
  srcLocation: {
    repository: { name: _.uniqueId('my-app-') }
  },
};

interface RunState {
  status: Status;
  result?: any;
  error?: any;
  statusMessages: StatusMessage[];
}

export function CreateNewAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);
  const [run, setRun] = useState<RunState>({ status: Status.EDITION, statusMessages: []});
  const client = useLauncherClient();

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
      overview: {
        component: ({edit}) => (
          <FrontendFormOverview value={app.frontend} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <FrontendForm
            value={app.frontend}
            onSave={(frontend) => {
              setApp({...app, frontend});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: 'backend',
      title: 'Backend',
      overview: {
        component: ({edit}) => (
          <BackendFormOverview value={app.backend} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <BackendForm
            value={app.backend}
            onSave={(backend) => {
              setApp({...app, backend});
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
    if (!isFrontendFormValueValid(app.frontend) && !isBackendFormValueValid(app.backend)) {
      console.warn('impossible to create an empty app');
      return;
    }

    setRun({ status: Status.RUNNING, statusMessages: [] });

    let parts: any[] = [];

    if (app.frontend.runtime) {
      parts.push({
        category: 'frontend',
        shared: {
          runtime: { name: app.frontend.runtime!.id, version: 'community' }
        }
      });
    }

    if (app.backend.runtime) {
      parts.push({
        category: 'backend',
        shared: {
          runtime: { name: app.backend.runtime!.id, version: 'community' }
        },
        capabilities: app.backend.capabilities
          .filter(c => c.selected)
          .map(c => ({ module: c.id, props: c.data }))
      });
    }

    if(parts.length > 1) {
      parts = parts.map(p => ({ ...p, subFolderName: p.category }));
    }

    const payload = {
      name: app.srcLocation.repository!.name,
      repository:  app.srcLocation.repository!.name,
      organization: app.srcLocation.repository!.org || '',
      clusterId: 'local',
      projectName: app.srcLocation.repository!.name,
      parts,
    };
    client.launch(payload).then((result) => {
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
