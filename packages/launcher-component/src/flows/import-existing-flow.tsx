import * as React from 'react';
import { useSessionStorageWithObject } from 'react-use-sessionstorage';

import { toImportAppPayload } from './launcher-client-adapters';
import {
  defaultSrcRepositoryFormValue,
  isSrcRepositoryFormValueValid,
  SrcRepositoryForm,
  SrcRepositoryFormValue
} from '../forms/src-repository-form';
import { ImportFormOverview } from '../forms/import-form-overview';
import { LaunchFlow, useAutoSetCluster } from './launch-flow';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';

interface CustomApp {
  srcRepository: SrcRepositoryFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  srcRepository: defaultSrcRepositoryFormValue,
  deployment: defaultDeploymentFormValue,
};

export function ImportExistingFlow(props: { onCancel?: () => void }) {
  const [app, setApp, clear] = useSessionStorageWithObject<CustomApp>('app', defaultCustomApp);
  const onCancel = () => {
    clear();
    props.onCancel!();
  };
  const showDeploymentForm = useAutoSetCluster(setApp);

  const items = [
    {
      id: 'import',
      title: 'Source Repository to import',
      overview: {
        component: ({ edit }) => (
          <ImportFormOverview value={app.srcRepository} onClick={edit} />
        ),
        width: 'half',
      },
      form: {
        component: ({ close }) => (
          <SrcRepositoryForm
            value={app.srcRepository}
            onSave={(srcRepository) => {
              setApp({ ...app, srcRepository });
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
      title="Import an Existing Application"
      items={items}
      isValid={() => isSrcRepositoryFormValueValid(app.srcRepository)}
      buildAppPayload={() => {
        clear();
        return toImportAppPayload(app);
      }}
      onCancel={onCancel}
    />
  );

}
