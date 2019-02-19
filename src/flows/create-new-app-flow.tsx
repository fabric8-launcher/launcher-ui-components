import * as React from 'react';
import { useState } from 'react';
import { BackendForm, BackendFormValue, defaultBackendFormValue, } from '../forms/backend-form';
import { defaultFrontendFormValue, FrontendForm, FrontendFormValue, } from '../forms/frontend-form';
import { HubNSpoke } from '../core/hub-n-spoke';
import { BackendFormOverview } from '../forms/backend-form-overview';
import { FrontendFormOverview } from '../forms/frontend-form-overview';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { defaultRepositoryFormValue, RepositoryForm, RepositoryFormValue } from '../forms/repository-form';
import { RepositoryFormOverview } from '../forms/repository-form-overview';

interface CustomApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  repository: RepositoryFormValue;
}

const defaultCustomApp = {
  backend: defaultBackendFormValue,
  frontend: defaultFrontendFormValue,
  repository: defaultRepositoryFormValue,
};

export function CreateNewAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

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
      id: 'repository',
      title: 'Repository',
      overview: {
        component: ({edit}) => (
          <RepositoryFormOverview value={app.repository} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <RepositoryForm
            value={app.repository}
            onSave={(repository) => {
              setApp({...app, repository});
              close();
            }}
            onCancel={close}
          />
        ),
      }
    }
  ];

  const toolbar = (
    <Toolbar style={{marginTop: '20px'}}>
      <ToolbarGroup>
        <Button variant="primary">Launch</Button>
      </ToolbarGroup>
      <ToolbarGroup>
        <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
      </ToolbarGroup>
    </Toolbar>
  );

  return (
    <React.Fragment>
      <HubNSpoke items={items} toolbar={toolbar}/>
    </React.Fragment>
  );

}
