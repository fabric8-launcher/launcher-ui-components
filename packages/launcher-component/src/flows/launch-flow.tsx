import React from 'react';
import { useState } from 'react';
import { Toolbar, ToolbarGroup, Button } from '@patternfly/react-core';
import { StatusMessage, LaunchAppPayload } from 'launcher-client';

import { useLauncherClient } from '../contexts/launcher-client-context';
import { HubNSpoke } from '..';
import { ProcessingApp } from '../misc/processing-app';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { DownloadNextSteps } from '../misc/download-next-steps';

enum Status {
  EDITION = 'EDITION', RUNNING = 'RUNNING', COMPLETED = 'COMPLETED', ERROR = 'ERROR', DOWNLOADED = 'DOWNLOADED'
}

interface RunState {
  status: Status;
  result?: any;
  error?: any;
  statusMessages: StatusMessage[];
}

interface LaunchFlowProps {
  items: any[];
  isValid: () => boolean;
  buildAppPayload: () => LaunchAppPayload;
  onCancel?: () => void;
}

export function LaunchFlow(props: LaunchFlowProps) {
  const [run, setRun] = useState<RunState>({ status: Status.EDITION, statusMessages: [] });
  const client = useLauncherClient();

  const launch = () => {
    if (!props.isValid()) {
      console.warn('impossible to create an empty app');
      return;
    }

    setRun({ status: Status.RUNNING, statusMessages: [] });

    client.launch(props.buildAppPayload()).then((result) => {
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

  const zip = () => {
    client.download(props.buildAppPayload()).then((result) => {
      setRun((prev) => ({ ...prev, result, status: Status.DOWNLOADED }));
    });
  };

  const toolbar = (
    <Toolbar style={{ marginTop: '20px' }}>
      <ToolbarGroup>
        <Button variant="primary" onClick={launch}>Launch</Button>
      </ToolbarGroup>
      <ToolbarGroup>
        <Button variant="primary" onClick={zip}>Download</Button>
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
      {run.status === Status.EDITION && (<HubNSpoke items={props.items} toolbar={toolbar} />)}
      {run.status === Status.RUNNING && (<ProcessingApp progressEvents={progressEvents} progressEventsResults={progressEventsResults} />)}
      {(run.status === Status.COMPLETED || run.status === Status.ERROR) && (<LaunchNextSteps error={run.error} />)}
      {run.status === Status.DOWNLOADED && (<DownloadNextSteps error={run.error} downloadLink={run.result.downloadLink} />)}
    </React.Fragment>
  );
}
