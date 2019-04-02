import * as React from 'react';
import { useSessionStorageWithObject } from 'react-use-sessionstorage';
import { generate } from 'project-name-generator';
import { BackendHub } from '../hubs/backend-hub';
import { FrontendHub, } from '../hubs/frontend-hub';
import { DestRepositoryHub } from '../hubs/dest-repository-hub';
import { LaunchFlow, useAutoSetCluster, useAutoSetDestRepository } from './launch-flow';
import { toNewAppPayload } from './launcher-client-adapters';
import { DeploymentHub } from '../hubs/deployment-hub';
import { readOnlyCapabilities } from '../loaders/capabilities-loader';
import { WelcomeAppHub } from '../hubs/welcome-app-hub';
import { NewApp } from './types';

const defaultCustomApp = {
  backend: {capabilitiesPickerValue: {capabilities: readOnlyCapabilities}},
  frontend: {},
  destRepository: {},
  deployment: {},
};

function getFlowStatus(app: NewApp) {
  if (!FrontendHub.checkCompletion(app.frontend) && !BackendHub.checkCompletion(app.backend)) {
    return {
      hint: 'You should configure a Frontend and/or a Backend for your application.',
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
      hint: 'If you wish   to Launch your application, you should configure the destination repository.',
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

export function CreateNewAppFlow(props: { appName?: string; onCancel?: () => void }) {
  const [app, setApp, clear] = useSessionStorageWithObject<NewApp>('new-app-flow', defaultCustomApp);
  const autoSetCluster = useAutoSetCluster(setApp);
  const autoSetDestRepository = useAutoSetDestRepository(props.appName || generate().dashed, setApp);

  const onCancel = () => {
    clear();
    props.onCancel!();
  };

  const items = [
    {
      id: FrontendHub.id,
      title: FrontendHub.title,
      overview: {
        component: ({edit}) => (
          <FrontendHub.Overview value={app.frontend} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <FrontendHub.Form
            initialValue={app.frontend}
            onSave={(frontend) => {
              setApp((prev) => ({...prev, frontend}));
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: BackendHub.id,
      title: BackendHub.title,
      overview: {
        component: ({edit}) => (
          <BackendHub.Overview value={app.backend} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <BackendHub.Form
            initialValue={app.backend}
            onSave={(backend) => {
              setApp((prev) => ({...prev, backend}));
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: WelcomeAppHub.id,
      title: WelcomeAppHub.title,
      overview: {
        component: () => (
          <WelcomeAppHub.Overview/>
        ),
        width: 'third',
      }
    },
    {
      id: DestRepositoryHub.id,
      title: DestRepositoryHub.title,
      loading: autoSetDestRepository.loading,
      overview: {
        component: ({edit}) => (
          <DestRepositoryHub.Overview value={app.destRepository} onClick={edit}/>
        ),
        width: 'half',
      },
      form: autoSetDestRepository.showForm && {
        component: ({close}) => (
          <DestRepositoryHub.Form
            initialValue={app.destRepository}
            onSave={(srcLocation) => {
              setApp((prev) => ({...prev, destRepository: srcLocation}));
              close();
            }}
            onCancel={close}
          />
        ),
      }
    },
    {
      id: DeploymentHub.id,
      title: DeploymentHub.title,
      loading: autoSetCluster.loading,
      overview: {
        component: ({edit}) => (
          <DeploymentHub.Overview value={app.deployment} onClick={edit}/>
        ),
        width: 'half',
      },
      form: autoSetCluster.showForm && {
        component: ({close}) => (
          <DeploymentHub.Form
            initialValue={app.deployment}
            onSave={(deployment) => {
              setApp(prev => ({...prev, deployment}));
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
      title="Create a New Application"
      items={items}
      {...getFlowStatus(app)}
      buildAppPayload={() => {
        clear();
        return toNewAppPayload(app);
      }}
      onCancel={onCancel}
    />
  );

}
