import * as React from 'react';
import { useState } from 'react';
import { generate } from 'project-name-generator';

import { BackendForm, defaultBackendFormValue, isBackendFormValueValid, BackendFormValue, } from '../forms/backend-form';
import { defaultFrontendFormValue, FrontendForm, isFrontendFormValueValid, FrontendFormValue, } from '../forms/frontend-form';
import { BackendFormOverview } from '../forms/backend-form-overview';
import { FrontendFormOverview } from '../forms/frontend-form-overview';
import { SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { LaunchFlow } from './launch-flow';
import { toNewAppPayload } from './launcher-client-adapters';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { WelcomeAppOverview } from '../forms/welcome-app-overview';

interface CustomApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  srcLocation: SrcLocationFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  backend: defaultBackendFormValue,
  frontend: defaultFrontendFormValue,
  srcLocation: {
    repository: {name: generate().dashed}
  },
  deployment: defaultDeploymentFormValue,
};

export function CreateNewAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

  const isValidForm = () => (isFrontendFormValueValid(app.frontend) || isBackendFormValueValid(app.backend))
    && !!app.deployment.cluster.clusterId;

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
      overview: {
        component: ({edit}) => (
          <FrontendFormOverview value={app.frontend} onClick={edit}/>
        ),
        width: 'third',
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
        width: 'third',
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
      id: 'welcome-app',
      title: 'Welcome Application',
      overview: {
        component: () => (
          <WelcomeAppOverview />
        ),
        width: 'third',
      }
    },
    {
      id: 'srcLocation',
      title: 'Source Location',
      overview: {
        component: ({edit}) => (
          <SrcLocationFormOverview value={app.srcLocation} onClick={edit}/>
        ),
        width: 'half',
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
    },
    {
      id: 'openshift-deployment',
      title: 'OpenShift Deployment',
      overview: {
        component: ({edit}) => (
          <DeploymentFormOverview value={app.deployment} onClick={edit}/>
        ),
        width: 'half',
      },
      form: {
        component: ({close}) => (
          <DeploymentForm
            value={app.deployment}
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
      isValid={isValidForm}
      buildAppPayload={() => toNewAppPayload(app)}
      onCancel={props.onCancel}
    />
  );

}
