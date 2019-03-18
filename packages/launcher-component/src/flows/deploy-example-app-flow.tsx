import * as React from 'react';
import { useSessionStorageWithObject } from 'react-use-sessionstorage';

import { createDestRepositoryFormValueWithGeneratedName, DestRepositoryHub } from '../hubs/dest-repository-hub';
import { toExamplePayload } from './launcher-client-adapters';
import { ExampleHub } from '../hubs/example-hub';
import { LaunchFlow, useAutoSetCluster } from './launch-flow';
import { DeploymentHub } from '../hubs/deployment-hub';
import { ExampleApp } from './types';

const defaultExampleApp = {
  example: {},
  destRepository: createDestRepositoryFormValueWithGeneratedName(),
  deployment: {},
};

function getFlowStatus(app: ExampleApp) {
  if (!ExampleHub.checkCompletion(app.example)) {
    return {
      hint: 'You should select an example application.',
      isReadyForDownload: false,
      isReadyForLaunch: false,
    };
  }
  if (!DeploymentHub.checkCompletion(app.deployment)) {
    return {
      hint: 'If you wish to Launch your application, you should configure OpenShift Deployment.',
      isReadyForDownload: true,
      isReadyForLaunch: false,
    };
  }
  if (!DestRepositoryHub.checkCompletion(app.destRepository)) {
    return {
      hint: 'If you wish to Launch your application, you should configure the destination repository.',
      isReadyForDownload: true,
      isReadyForLaunch: false,
    };
  }
  return {
    hint: 'Your application is ready to launch!',
    isReadyForDownload: true,
    isReadyForLaunch: true,
  };
}

export function DeployExampleAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp, clear] = useSessionStorageWithObject<ExampleApp>('app', defaultExampleApp);
  const onCancel = () => {
    clear();
    props.onCancel!();
  };
  const showDeploymentForm = useAutoSetCluster(setApp);

  const flowStatus = getFlowStatus(app);

  const items = [
    {
      id: 'example',
      title: 'Example',
      overview: {
        component: ({edit}) => (
          <ExampleHub.Overview value={app.example} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <ExampleHub.Form
            initialValue={app.example}
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
      id: 'destRepository',
      title: 'Destination Repository',
      overview: {
        component: ({edit}) => (
          <DestRepositoryHub.Overview value={app.destRepository} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <DestRepositoryHub.Form
            initialValue={app.destRepository}
            onSave={(srcLocation) => {
              setApp({...app, destRepository: srcLocation});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: 'openshift-deployment',
      title: 'OpenShift Deployment',
      overview: {
        component: ({edit}) => (
          <DeploymentHub.Overview value={app.deployment} onClick={edit}/>
        ),
        width: 'third',
      },
      form: showDeploymentForm && {
        component: ({close}) => (
          <DeploymentHub.Form
            initialValue={app.deployment}
            onSave={(deployment) => {
              setApp({...app, deployment});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    }
  ];

  return (
    <LaunchFlow
      title="Deploy an Example Application"
      items={items}
      {...flowStatus}
      buildAppPayload={() => {
        clear();
        return toExamplePayload(app);
      }}
      onCancel={onCancel}
    />
  );

}
