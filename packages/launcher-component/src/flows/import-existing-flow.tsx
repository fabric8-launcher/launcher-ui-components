import * as React from 'react';
import { useState } from 'react';

import { toImportAppPayload } from './launcher-client-adapters';
import { ImportFormValue, ImportForm, isImportFormValueValid } from '../forms/import-form';
import { defaultBuidImagePickerValue } from '../pickers/buildimage-picker/buildimage-picker';
import { ImportFormOverview } from '../forms/import-form-overview';
import { defaultRepoPickerValue } from '../pickers/repository-picker/repository-picker';
import { LaunchFlow } from './launch-flow';

interface CustomApp {
  importApp: ImportFormValue;
}

const defaultCustomApp = {
  importApp: {
    repository: defaultRepoPickerValue,
    buildImage: defaultBuidImagePickerValue
  },
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
