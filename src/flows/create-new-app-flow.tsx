import * as React from 'react';
import { useState } from 'react';
import {
  BackendPicker,
  BackendPickerValue,
  defaultBackendPickerValue,
  isBackendPickerValueValid
} from '../pickers/backend-picker/backend-picker';
import {
  defaultFrontendPickerValue,
  FrontendPicker,
  FrontendPickerValue,
  isFrontendPickerValueValid
} from '../pickers/frontend-picker/frontend-picker';
import { HubNSpoke } from '../core/hub-n-spoke';
import { FormPanel } from '../core/form-panel/form-panel';
import { BackendOverview } from '../overviews/backend-overview';
import { FrontendOverview } from '../overviews/frontend-overview';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';

interface CustomApp {
  backend: BackendPickerValue;
  frontend: FrontendPickerValue;
}

const defaultCustomApp = {
  backend: defaultBackendPickerValue,
  frontend: defaultFrontendPickerValue,
};

export function CreateNewAppFlow(props: {onCancel?: () => void }) {
  const [app, setApp] = useState<CustomApp>(defaultCustomApp);

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
      overview: {
        component: ({edit}) => (
          <FrontendOverview value={app.frontend} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel
            value={app.frontend}
            onSave={(frontend) => {
              setApp({...app, frontend});
              close();
            }}
            onCancel={close}
            isValid={isFrontendPickerValueValid}
          >
            {
              (inputProps) => (<FrontendPicker {...inputProps}/>)}
          </FormPanel>
        ),
      }
    },
    {
      id: 'backend',
      title: 'Backend',
      overview: {
        component: ({edit}) => (
          <BackendOverview value={app.backend} onClick={edit}/>
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel
            value={app.backend}
            onSave={(backend) => {
              setApp({...app, backend});
              close();
            }}
            onCancel={close}
            isValid={isBackendPickerValueValid}
          >
            {
              (inputProps) => (<BackendPicker {...inputProps}/>)}
          </FormPanel>
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
