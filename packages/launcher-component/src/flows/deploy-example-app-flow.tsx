import * as React from 'react';
import { useState } from 'react';
import { generate } from 'project-name-generator';

import { DestRepositoryForm, DestRepositoryFormValue } from '../forms/dest-repository-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { toExamplePayload } from './launcher-client-adapters';
import { ExampleFormOverview } from '../forms/example-form-overview';
import { ExamplePickerValue } from '../pickers/example-picker';
import { defaultExampleFormValue, ExampleForm, isExampleFormValueValid } from '../forms/example-form';
import { LaunchFlow, useAutoSetCluster } from './launch-flow';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';

interface ExampleApp {
  example: ExamplePickerValue;
  destRepository: DestRepositoryFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  example: defaultExampleFormValue,
  destRepository: {
    repository: {name: generate().dashed}
  },
  deployment: defaultDeploymentFormValue,
};

export function DeployExampleAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<ExampleApp>(defaultCustomApp);
  const showDeploymentForm = useAutoSetCluster(setApp);
  const items = [
    {
      id: 'example',
      title: 'Example',
      overview: {
        component: ({edit}) => (
          <ExampleFormOverview value={app.example} onClick={edit}/>
        ),
        width: 'third',
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
      id: 'destRepository',
      title: 'Source Location',
      overview: {
        component: ({edit}) => (
          <SrcLocationFormOverview value={app.destRepository} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <DestRepositoryForm
            value={app.destRepository}
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
          <DeploymentFormOverview value={app.deployment} onClick={edit}/>
        ),
        width: 'third',
      },
      form: showDeploymentForm && {
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
      title="Deploy an Example Application"
      items={items}
      isValid={() => isExampleFormValueValid(app.example)}
      buildAppPayload={() => toExamplePayload(app)}
      onCancel={props.onCancel}
    />
  );

}
