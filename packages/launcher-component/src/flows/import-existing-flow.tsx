import * as React from 'react';
import { useState } from 'react';

import { toImportAppPayload } from './launcher-client-adapters';
import { ImportFormValue, ImportForm, isImportFormValueValid } from '../forms/import-form';
import { defaultBuidImagePickerValue } from '../pickers/buildimage-picker/buildimage-picker';
import { ImportFormOverview } from '../forms/import-form-overview';
import { defaultRepoPickerValue } from '../pickers/repository-picker/repository-picker';
import { LaunchFlow } from './launch-flow';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';

interface CustomApp {
  importApp: ImportFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  importApp: {
    repository: defaultRepoPickerValue,
    buildImage: defaultBuidImagePickerValue
  },
  deployment: defaultDeploymentFormValue,
};

export function ImportExistingFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

  const items = [
    {
      id: 'import',
      title: 'Import',
      overview: {
        component: ({ edit }) => (
          <ImportFormOverview value={app.importApp} onClick={edit} />
        ),
        width: 'half',
      },
      form: {
        component: ({ close }) => (
          <ImportForm
            value={app.importApp}
            onSave={(importApp) => {
              setApp({ ...app, importApp });
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
      items={items}
      isValid={() => isImportFormValueValid(app.importApp)}
      buildAppPayload={() => toImportAppPayload(app)}
      onCancel={props.onCancel}
    />
  );

}
