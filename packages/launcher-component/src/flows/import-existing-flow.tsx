import * as React from 'react';
import { useState } from 'react';

import { toImportAppPayload } from './launcher-client-adapters';
import { defaultSrcRepositoryFormValue, SrcRepositoryForm, SrcRepositoryFormValue, isSrcRepositoryFormValueValid } from '../forms/src-repository-form';
import { ImportFormOverview } from '../forms/import-form-overview';
import { LaunchFlow } from './launch-flow';
import { DeploymentFormOverview } from '../forms/deployment-form-overview';
import { defaultDeploymentFormValue, DeploymentForm, DeploymentFormValue } from '../forms/deployment-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { defaultDestRepositoryFormValue, DestRepositoryForm, DestRepositoryFormValue } from '../forms/dest-repository-form';

interface CustomApp {
  srcRepository: SrcRepositoryFormValue;
  destRepository: DestRepositoryFormValue;
  deployment: DeploymentFormValue;
}

const defaultCustomApp = {
  srcRepository: defaultSrcRepositoryFormValue,
  destRepository: defaultDestRepositoryFormValue,
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
          <DestRepositoryForm
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
      isValid={() => isSrcRepositoryFormValueValid(app.srcRepository)}
      buildAppPayload={() => toImportAppPayload(app)}
      onCancel={props.onCancel}
      canDownload={false}
    />
  );

}
