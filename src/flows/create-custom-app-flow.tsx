import * as React from 'react';
import {useState} from 'react';
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
import {HubNSpoke} from '../core/hub-n-spoke';
import {FormPanel} from '../core/form-panel/form-panel';


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
        component: (
          <div>
            {
              customApp.frontend.runtime ?
                (<p>you selected {customApp.frontend.runtime.id}</p>) :
                (<p>you can select a Frontend</p>)
            }
          </div>
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel value={customApp.frontend} onSave={(frontend) => { setCustomApp({...customApp, frontend}); close() }}
                     onCancel={close}
                     isValid={isFrontendPickerValueValid}>
            {
              (inputProps) => (<FrontendPicker {...inputProps}/>)
            }
          </FormPanel>
        ),
      }
    },
    {
      id: 'backend',
      title: 'Backend',
      overview: {
        component: (
          <div>
            {
              customApp.backend.runtime ?
                (<p>you selected runtime {customApp.backend.runtime.id}
                and capabilities {customApp.backend.capabilities.filter(c => c.selected).map(c => c.id).join(', ')}</p>) :
                (<p>you can select a Backend</p>)
            }
          </div>
        ),
      },
      form: {
        component: ({close}) => (
          <FormPanel value={customApp.backend} onSave={(backend) => { setCustomApp({...customApp, backend}); close() }}
                     onCancel={close}
                     isValid={isBackendPickerValueValid}>
            {
              (inputProps) => (<BackendPicker {...inputProps}/>)
            }
          </FormPanel>
        ),
      }
    }
  ];


  return (
    <HubNSpoke items={items}/>
  );

}