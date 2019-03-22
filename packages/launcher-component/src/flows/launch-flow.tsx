import React, { useEffect, useState } from 'react';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { LaunchAppPayload, StatusMessage } from 'launcher-client';

import { useLauncherClient } from '../contexts/launcher-client-context';
import { ProcessingApp } from '../misc/processing-app';
import { LaunchNextSteps } from '../misc/launch-next-steps';
import { DownloadNextSteps } from '../misc/download-next-steps';
import { HubNSpoke } from '../core/hub-n-spoke';
import { DownloadIcon, ErrorCircleOIcon, PlaneDepartureIcon } from '@patternfly/react-icons';
import style from './launch-flow.module.scss';
import { ExampleApp, NewApp } from './types';

enum Status {
  EDITION = 'EDITION', RUNNING = 'RUNNING', COMPLETED = 'COMPLETED', ERROR = 'ERROR', DOWNLOADED = 'DOWNLOADED'
}

export function useAutoSetDestRepository(defaultName: string, setApp) {
  const client = useLauncherClient();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    client.gitInfo().then(info => {
      setApp((prev: ExampleApp | NewApp) => {
        if (prev.destRepository.userRepositoryPickerValue && prev.destRepository.userRepositoryPickerValue.name) {
          return prev;
        }
        return {...prev, destRepository: {userRepositoryPickerValue: {name: defaultName}, isProviderAuthorized: true}};
      });
      setShowForm(true);
      setLoading(false);
    }).catch(e => {
      setApp((prev: ExampleApp | NewApp) => {
        setShowForm(false);
        return {...prev, destRepository: {isProviderAuthorized: false}};
      });
      setLoading(false);
    });
  }, []);
  return {showForm, loading};
}

export function useAutoSetCluster(setApp) {
  const client = useLauncherClient();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    client.ocClusters().then(clusters => {
      const connectedClusters = clusters.filter(cluster => cluster.connected);
      if (connectedClusters.length === 1) {
        setApp((prev: ExampleApp | NewApp) => {
          if (prev.deployment.clusterPickerValue && prev.deployment.clusterPickerValue.clusterId) {
            return prev;
          }
          return ({...prev, deployment: {clusterPickerValue: {clusterId: connectedClusters[0].id}}});
        });
        setShowForm(clusters.length > 1);
        setLoading(false);
      } else {
        setShowForm(true);
        setLoading(false);
      }
    }).catch(e => {
      console.warn('An error happened while trying to load clusters for auto-selection', e);
      setLoading(false);
    });
  }, []);
  return {showForm, loading};
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
  hint?: string;
  isReadyForLaunch: boolean;
  isReadyForDownload: boolean;
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
    if (!props.isReadyForLaunch) {
      throw new Error('Launch must not be called when app is not ready!');
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

  const download = () => {
    if (!props.isReadyForDownload) {
      throw new Error('Download must not be called when app is not ready!');
    }

    setRun({status: Status.RUNNING, statusMessages: []});

    client.download(props.buildAppPayload()).then((result) => {
      setRun((prev) => ({...prev, result, status: Status.DOWNLOADED}));
    }).catch(error => {
      setRun((prev) => ({...prev, status: Status.ERROR, error}));
    });
  };

  const toolbar = (
    <Toolbar className={style.toolbar}>
      <ToolbarGroup className={style.toolbarGroup}>
        <Button variant="primary" onClick={launch} className={style.toolbarButton} isDisabled={!props.isReadyForLaunch}>
          <PlaneDepartureIcon className={style.buttonIcon}/>Launch
        </Button>
        {canDownload && (
          <Button variant="primary" onClick={download} className={style.toolbarButton} isDisabled={!props.isReadyForDownload}>
            <DownloadIcon className={style.buttonIcon}/>Download
          </Button>
        )}
        <Button variant="secondary" onClick={props.onCancel} className={style.toolbarButton}>
          <ErrorCircleOIcon className={style.buttonIcon}/>Cancel
        </Button>
      </ToolbarGroup>

    </Toolbar>
  );

  const progressEvents = run.status === Status.RUNNING && run.result && run.result.events;
  const progressEventsResults = run.status === Status.RUNNING && run.result && run.statusMessages;

  const links = run.statusMessages.filter(m => m.data).map(m => {
    if (m.data!.routes) {
      return m.data!.routes;
    }
    return {[m.statusMessage]: m.data!.location};
  })!.reduce(
    (map, obj) => {
      for (const key of Object.keys(obj)) {
        map[key] = obj[key];
      }
      return map;
    }, {}
  );

  const goBackToEdition = () => setRun({status: Status.EDITION, statusMessages: []});

  return (
    <React.Fragment>
      <HubNSpoke title={props.title} items={props.items} toolbar={toolbar} error={run.error} hint={props.hint}/>
      {run.status === Status.RUNNING && (
        <ProcessingApp progressEvents={progressEvents} progressEventsResults={progressEventsResults}/>)}
      {!run.error && run.status === Status.COMPLETED && (<LaunchNextSteps links={links} onClose={onCancel}/>)}
      {!run.error && run.status === Status.DOWNLOADED
      && (<DownloadNextSteps onClose={goBackToEdition} downloadLink={run.result.downloadLink}/>)}
    </React.Fragment>
  );
}
