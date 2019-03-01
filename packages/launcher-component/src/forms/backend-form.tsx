import {
  CapabilitiesPicker,
  CapabilitiesPickerValue,
  defaultCapabilitiesPickerValue
} from '../pickers/capabilities-picker/capabilities-picker';
import { DescriptiveHeader } from '../core/descriptive-header';
import * as React from 'react';
import { RuntimePicker, RuntimePickerValue } from '../pickers/runtime-picker/runtime-picker';
import { EnumsRuntimesLoaders } from '../loaders/enums-runtimes-loaders';
import { CapabilitiesLoader, capabilityToItem } from '../loaders/capabilities-loader';
import { FormPanel } from '../core/form-panel/form-panel';

export interface BackendFormValue {
  runtime?: RuntimePickerValue;
  capabilities: CapabilitiesPickerValue;
}

export function isBackendFormValueValid(value: BackendFormValue) {
  return value.capabilities.filter(c => c.selected).length > 0 && !!value.runtime;
}

export const defaultBackendFormValue: BackendFormValue = {
  capabilities: defaultCapabilitiesPickerValue,
};

interface BackendFormProps {
  value: BackendFormValue;

  onSave?(value: BackendFormValue);
  onCancel?();
}

export function BackendForm(props: BackendFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              title="Runtime"
              description="Runtimes power the server-side processing of your application,
                       and we can get you set up in one of several languages and frameworks.
                       If you're looking to expose an HTTP API or interact with services like a database,
                       choosing one here will hook that together for you."
            />
            <EnumsRuntimesLoaders category="backend">
              {(items) => (
                <RuntimePicker
                  items={items}
                  value={inputProps.value.runtime}
                  onChange={(runtime) => inputProps.onChange({...inputProps.value, runtime})}
                />
              )}
            </EnumsRuntimesLoaders>
            {inputProps.value.runtime && (
              <React.Fragment>
                <DescriptiveHeader
                  title="Capabilities"
                  description="Capabilities specify what your application can do.
     Select from the below, and we'll wire your application code,
     services, and OpenShift together end-to-end. When done, our friendly Welcome Application will show you how
     everything works."
                />
                <CapabilitiesLoader categories={['backend']}>
                  {(capabilities) => (
                    <CapabilitiesPicker
                      items={capabilities.map(capabilityToItem)}
                      value={inputProps.value.capabilities}
                      onChange={(caps) => inputProps.onChange({...inputProps.value, capabilities: caps})}
                    />
                  )}
                </CapabilitiesLoader>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </FormPanel>
  );
}
