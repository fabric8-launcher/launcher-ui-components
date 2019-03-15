import * as React from 'react';
import { useSessionStorageWithObject } from 'react-use-sessionstorage';

import { BackendHub, BackendFormValue } from '../hubs/backend-hub';
import { FrontendHub, FrontendFormValue, } from '../hubs/frontend-hub';
import { createDestRepositoryFormValueWithGeneratedName, DestRepositoryHub, DestRepositoryFormValue } from '../hubs/dest-repository-hub';
import { LaunchFlow, useAutoSetCluster } from './launch-flow';
import { toNewAppPayload } from './launcher-client-adapters';
import { DeploymentHub, DeploymentFormValue } from '../hubs/deployment-hub';
import { readOnlyCapabilities } from '../loaders/capabilities-loader';
import { WelcomeAppHub } from '../hubs/welcome-app-hub';

interface CustomApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  destRepository: DestRepositoryFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  backend: {capabilitiesPickerValue: {capabilities: readOnlyCapabilities}},
  frontend: {},
  destRepository: createDestRepositoryFormValueWithGeneratedName(),
  deployment: {},
};

function getFlowStatus(app: CustomApp) {
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

export function CreateNewAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp, clear] = useSessionStorageWithObject<CustomApp>('app', defaultCustomApp);
  const onCancel = () => {
    clear();
    props.onCancel!();
  };

  const showDeploymentForm = useAutoSetCluster(setApp);

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
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
          <BackendHub.Overview value={app.backend} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <BackendHub.Form
            initialValue={app.backend}
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
      id: 'welcome-app',
      title: 'Welcome Application',
      overview: {
        component: () => (
          <WelcomeAppHub.Overview/>
        ),
        width: 'third',
      }
    },
    {
      id: 'destRepository',
      title: 'Destination Repository',
      overview: {
        component: ({edit}) => (
          <DestRepositoryHub.Overview value={app.destRepository} onClick={edit}/>
        ),
        width: 'half',
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
