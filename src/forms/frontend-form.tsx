import { DescriptiveHeader } from '../core/descriptive-header';
import * as React from 'react';
import { RuntimePicker, RuntimePickerValue } from '../pickers/runtime-picker/runtime-picker';
import { EnumsRuntimesLoaders } from '../loaders/enums-runtimes-loaders';
import { FormPanel } from '../core/form-panel/form-panel';

export interface FrontendFormValue {
  runtime?: RuntimePickerValue;
}

export function isFrontendFormValueValid(value: FrontendFormValue) {
  return !!value.runtime;
}

export const defaultFrontendFormValue: FrontendFormValue = {};

interface FrontendFormProps {
  value: FrontendFormValue;

  onSave?(value: FrontendFormValue);
  onCancel?();

}

export function FrontendForm(props: FrontendFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isFrontendFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              title="Frontend"
              description="You may optionally select a frontend application to bootstrap your web-based development.
                        These options scaffold a starting point in your framework of choice."
            />
            <EnumsRuntimesLoaders category="frontend">
              {(items) => (
                <RuntimePicker
                  items={items}
                  value={inputProps.value.runtime}
                  onChange={(runtime) => inputProps.onChange({...inputProps.value, runtime})}
                />
              )}
            </EnumsRuntimesLoaders>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
