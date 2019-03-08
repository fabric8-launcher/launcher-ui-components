import React, { useState } from 'react';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { LaunchAppPayload, StatusMessage } from 'launcher-client';

import { useLauncherClient } from '../contexts/launcher-client-context';
import { ProcessingApp } from '../misc/processing-app';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { DownloadNextSteps } from '../misc/download-next-steps';
import { HubNSpoke } from '../core/hub-n-spoke';
import { DownloadIcon, ErrorCircleOIcon, PlaneDepartureIcon } from '@patternfly/react-icons';

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
  title: string;
  items: any[];
  isValid: () => boolean;
  buildAppPayload: () => LaunchAppPayload;
  onCancel?: () => void;
  canDownload?: boolean;
}

export function LaunchFlow(props: LaunchFlowProps) {
  const [run, setRun] = useState<RunState>({status: Status.EDITION, statusMessages: []});
  const client = useLauncherClient();
  const canDownload = props.canDownload === undefined || props.canDownload;
  const onCancel = props.onCancel || (() => {
  });
  const launch = () => {
    if (!props.isValid()) {
      console.warn('Your current selection is not valid.');
      return;
    }

    setRun({status: Status.RUNNING, statusMessages: []});

    client.launch(props.buildAppPayload()).then((result) => {
      setRun((prev) => ({...prev, result}));
      client.follow(result.id, result.events, {
        onMessage: (statusMessages) => {
          setRun((prev) => ({...prev, statusMessages: [...prev.statusMessages, statusMessages]}));
        },
        onComplete: () => {
          setRun((prev) => ({...prev, status: Status.COMPLETED}));
        },
        onError: (error) => {
          setRun((prev) => ({...prev, status: Status.ERROR, error}));
        }
      });
    }).catch(error => {
      setRun((prev) => ({...prev, status: Status.ERROR, error}));
    });
  };

  const zip = () => {
    client.download(props.buildAppPayload()).then((result) => {
      setRun((prev) => ({...prev, result, status: Status.DOWNLOADED}));
    }).catch(error => {
      setRun((prev) => ({...prev, status: Status.ERROR, error}));
    });
  };

  const toolbar = (
    <Toolbar style={{marginTop: '20px'}}>
      <ToolbarGroup>
        <Button variant="primary" onClick={launch}><PlaneDepartureIcon style={{marginRight: '10px'}}/> Launch</Button>
      </ToolbarGroup>
      {canDownload && (
        <ToolbarGroup>
          <Button variant="primary" onClick={zip}><DownloadIcon style={{marginRight: '10px'}}/> Download</Button>
        </ToolbarGroup>
      )}
      <ToolbarGroup>
        <Button variant="secondary" onClick={props.onCancel}><ErrorCircleOIcon style={{marginRight: '10px'}}/>Cancel</Button>
      </ToolbarGroup>
    </Toolbar>
  );

  const progressEvents = run.status === Status.RUNNING && run.result && run.result.events;
  const progressEventsResults = run.status === Status.RUNNING && run.result && run.statusMessages;

  const links = run.statusMessages.filter(m => m.data).map(m => ({[m.statusMessage]: m.data!.location}))!.reduce(
    (map, obj) => {
      const key = Object.keys(obj)[0];
      map[key] = obj[key];
      return map;
    }, {}
  );

  return (
    <React.Fragment>
      <HubNSpoke title={props.title} items={props.items} toolbar={toolbar} error={run.error}/>
      {run.status === Status.RUNNING && (
        <ProcessingApp progressEvents={progressEvents} progressEventsResults={progressEventsResults}/>)}
      {run.status === Status.COMPLETED && (<LaunchNextSteps links={links} onClose={onCancel}/>)}
      {run.status === Status.DOWNLOADED && (<DownloadNextSteps onClose={onCancel} downloadLink={run.result.downloadLink}/>)}
    </React.Fragment>
  );
}
