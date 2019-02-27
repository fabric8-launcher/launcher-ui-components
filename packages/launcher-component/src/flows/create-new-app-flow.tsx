import * as React from 'react';
import { useState } from 'react';
import _ from 'lodash';

import { BackendForm, defaultBackendFormValue, isBackendFormValueValid, BackendFormValue, } from '../forms/backend-form';
import { defaultFrontendFormValue, FrontendForm, isFrontendFormValueValid, FrontendFormValue, } from '../forms/frontend-form';
import { BackendFormOverview } from '../forms/backend-form-overview';
import { FrontendFormOverview } from '../forms/frontend-form-overview';
import { SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { LaunchFlow } from './launch-flow';
import { toNewAppPayload } from './launcher-client-adapters';

interface CustomApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  srcLocation: SrcLocationFormValue;
}

const defaultCustomApp = {
  backend: defaultBackendFormValue,
  frontend: defaultFrontendFormValue,
  srcLocation: {
    repository: { name: 'my-app-' + _.random(1, 1000) }
  },
};

export function CreateNewAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

  const isValidForm = () => isFrontendFormValueValid(app.frontend) || isBackendFormValueValid(app.backend);

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
      overview: {
        component: ({edit}) => (
          <FrontendFormOverview value={app.frontend} onClick={edit}/>
        ),
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
      id: 'srcLocation',
      title: 'Source Location',
      overview: {
        component: ({edit}) => (
          <SrcLocationFormOverview value={app.srcLocation} onClick={edit}/>
        ),
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
    }
  ];

  return (
    <LaunchFlow
      items={items}
      isValid={isValidForm}
      buildAppPayload={() => toNewAppPayload(app)}
      onCancel={props.onCancel}
    />
  );

}
