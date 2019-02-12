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

interface CustomApp {
  backend: BackendPickerValue;
  frontend: FrontendPickerValue;
}

const defaultCustomApp = {
  backend: defaultBackendPickerValue,
  frontend: defaultFrontendPickerValue,
};

export function CreateCustomAppFlow() {
  const [customApp, setCustomApp] = useState<CustomApp>(defaultCustomApp);

  const items = [
    {
      id: 'frontend',
      title: 'Frontend',
      overview: {
        component: ({edit}) => (
          <FrontendOverview value={customApp.frontend} onClick={edit} />
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel value={customApp.frontend} onSave={(frontend) => { setCustomApp({...customApp, frontend}); close(); }}
                     onCancel={close}
                     isValid={isFrontendPickerValueValid}>
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
          <BackendOverview value={customApp.backend} onClick={edit} />
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel value={customApp.backend} onSave={(backend) => { setCustomApp({...customApp, backend}); close(); }}
                     onCancel={close}
                     isValid={isBackendPickerValueValid}>
            {
              (inputProps) => (<BackendPicker {...inputProps}/>)}
          </FormPanel>
        ),
      }
    }
  ];

  return (
    <HubNSpoke items={items}/>
  );

}
