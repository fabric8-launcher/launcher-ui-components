import * as React from 'react';
import { useState } from 'react';
import _ from 'lodash';

import { SrcLocationForm, SrcLocationFormValue } from '../forms/src-location-form';
import { SrcLocationFormOverview } from '../forms/src-location-form-overview';
import { toExamplePayload } from './launcher-client-adapters';
import { ExampleFormOverview } from '../forms/example-form-overview';
import { ExamplePickerValue } from '../pickers/example-picker/example-picker';
import { defaultExampleFormValue, ExampleForm, isExampleFormValueValid } from '../forms/example-form';
import { Progress } from './progress';

interface ExampleApp {
  example: ExamplePickerValue;
  srcLocation: SrcLocationFormValue;
}

const defaultCustomApp = {
  example: defaultExampleFormValue,
  srcLocation: {
    repository: { name: 'my-app-' + _.random(1, 1000) }
  },
};

export function CreateExampleAppFlow(props: { onCancel?: () => void }) {
  const [app, setApp] = useState<ExampleApp>(defaultCustomApp);

  const items = [
    {
      id: 'example',
      title: 'Example',
      overview: {
        component: ({edit}) => (
          <ExampleFormOverview value={app.example} onClick={edit}/>
        ),
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
    <Progress
      items={items}
      isValid={() => isExampleFormValueValid(app.example)}
      convert={() => toExamplePayload(app)}
      onCancel={props.onCancel}
    />
  );

}
