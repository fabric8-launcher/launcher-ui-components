import { DescriptiveHeader } from '../core/stuff';
import * as React from 'react';
import { FormPanel } from '../core/form-panel/form-panel';
import { ExamplesLoader } from '../loaders/example-catalog-loader';
import { ExamplePicker, ExamplePickerValue } from '../pickers/example-picker';

export function isExampleFormValueValid(value: ExamplePickerValue) {
  return !!value.missionId;
}

export const defaultExampleFormValue: ExamplePickerValue = {};

interface ExampleFormProps {
  value: ExamplePickerValue;

  onSave?(value: ExamplePickerValue);
  onCancel?();

}

export function ExampleForm(props: ExampleFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isExampleFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              description="Select the use case that you want an Example of.
                        Once the use case is selected you can select the runtime implementation"
            />
        <ExamplesLoader>
          {result => (
              <ExamplePicker {...inputProps} {...result}/>
          )}
        </ExamplesLoader>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
