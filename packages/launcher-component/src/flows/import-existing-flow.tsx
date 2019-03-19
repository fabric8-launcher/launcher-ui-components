import * as React from 'react';
import { useSessionStorageWithObject } from 'react-use-sessionstorage';

import { toImportAppPayload } from './launcher-client-adapters';
import { SrcRepositoryHub } from '../hubs/src-repository-hub';
import { LaunchFlow, useAutoSetCluster } from './launch-flow';
import { DeploymentHub } from '../hubs/deployment-hub';
import { ImportApp } from './types';

const defaultImportApp = {
  srcRepository: {},
  deployment: {},
};

function getFlowStatus(app: ImportApp) {
  if (!SrcRepositoryHub.checkCompletion(app.srcRepository)) {
    return {
      hint: 'You should configure the source repository.',
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
  return {
    hint: 'Your application is ready to launch!',
    isReadyForDownload: true,
    isReadyForLaunch: true,
  };
}

export function ImportExistingFlow(props: { onCancel?: () => void }) {
  const [app, setApp, clear] = useSessionStorageWithObject<ImportApp>('import-existing-app', defaultImportApp);
  const onCancel = () => {
    clear();
    props.onCancel!();
  };
  const showDeploymentForm = useAutoSetCluster(setApp);

  const flowStatus = getFlowStatus(app);

  const items = [
    {
      id: 'import',
      title: 'Source Repository to import',
      overview: {
        component: ({edit}) => (
          <SrcRepositoryHub.Overview value={app.srcRepository} onClick={edit}/>
        ),
        width: 'half',
      },
      form: {
        component: ({close}) => (
          <SrcRepositoryHub.Form
            initialValue={app.srcRepository}
            onSave={(srcRepository) => {
              setApp({...app, srcRepository});
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
        width: 'half',
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
      title="Import an Existing Application"
      items={items}
      {...flowStatus}
      buildAppPayload={() => {
        clear();
        return toImportAppPayload(app);
      }}
      onCancel={onCancel}
    />
  );

}
