import * as React from 'react';
import { useState } from 'react';

import { toImportAppPayload } from './launcher-client-adapters';
import { defaultImportFormValue, ImportForm, ImportFormValue, isImportFormValueValid } from '../forms/import-form';
import { ImportFormOverview } from '../forms/import-form-overview';
import { LaunchFlow } from './launch-flow';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { defaultSrcLocationFormValue, SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';

interface CustomApp {
  srcRepository: ImportFormValue;
  destRepository: SrcLocationFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  srcRepository: defaultImportFormValue,
  destRepository: defaultSrcLocationFormValue,
  deployment: defaultDeploymentFormValue,
};

export function ImportExistingFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

  const items = [
    {
      id: 'import',
      title: 'Source Repository to import',
      overview: {
        component: ({ edit }) => (
          <ImportFormOverview value={app.srcRepository} onClick={edit} />
        ),
        width: 'third',
      },
      form: {
        component: ({ close }) => (
          <ImportForm
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
      id: 'destRepository',
      title: 'Destination Repository',
      overview: {
        component: ({edit}) => (
          <SrcLocationFormOverview value={app.destRepository} onClick={edit}/>
        ),
        width: 'third',
      },
      form: {
        component: ({close}) => (
          <SrcLocationForm
            value={app.destRepository}
            onSave={(destRepository) => {
              setApp({...app, destRepository});
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
      title="Import an Existing Application"
      items={items}
      isValid={() => isImportFormValueValid(app.srcRepository)}
      buildAppPayload={() => toImportAppPayload(app)}
      onCancel={props.onCancel}
      canDownload={false}
    />
  );

}
