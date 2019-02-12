import {
  CapabilitiesPicker,
  CapabilitiesPickerValue,
  defaultCapabilitiesPickerValue
} from '../capabilities-picker/capabilities-picker';
import { InputProps } from '../../core/types';
import { DescriptiveHeader } from '../../core/descriptive-header';
import * as React from 'react';
import { RuntimePicker, RuntimePickerValue } from '../runtime-picker/runtime-picker';
import { EnumsRuntimesLoaders } from '../../loaders/enums-runtimes-loaders';
import { CapabilitiesLoader, capabilityToItem } from '../../loaders/capabilities-loader';

export interface BackendPickerValue {
  runtime?: RuntimePickerValue;
  capabilities: CapabilitiesPickerValue;
}

export function isBackendPickerValueValid(value: BackendPickerValue) {
  return value.capabilities.filter(c => c.selected).length > 1 && !!value.runtime;
}

export const defaultBackendPickerValue: BackendPickerValue = {
  capabilities: defaultCapabilitiesPickerValue,
};

interface BackendPickerProps extends InputProps<BackendPickerValue> {
}

export function CapabilitiesHeader() {
  return (
    <DescriptiveHeader
      title="Capabilities"
      description="Capabilities specify what your application can do.
     Select from the below, and we'll wire your application code,
     services, and OpenShift together end-to-end. When done, our friendly Welcome Application will show you how
     everything works."
    />
  );
}

export function RuntimeHeader() {
  return (
    <DescriptiveHeader
      title="Runtime"
      description="Runtimes power the server-side processing of your application,
                       and we can get you set up in one of several languages and frameworks.
                       If you're looking to expose an HTTP API or interact with services like a database,
                       choosing one here will hook that together for you."
    />

  );
}

export function BackendPicker(props: BackendPickerProps) {
  return (
    <React.Fragment>
      <RuntimeHeader/>
      <EnumsRuntimesLoaders category="backend">
        {(items) => (
          <RuntimePicker
            items={items}
            value={props.value.runtime}
            onChange={(runtime) => props.onChange({...props.value, runtime})}
          />
        )}
      </EnumsRuntimesLoaders>
      {props.value.runtime && (
        <React.Fragment>
          <CapabilitiesHeader/>
          <CapabilitiesLoader categories={['backend', 'support']}>
            {(capabilities) => (
              <CapabilitiesPicker
                items={capabilities.map(capabilityToItem)}
                value={props.value.capabilities}
                onChange={(caps) => props.onChange({...props.value, capabilities: caps})}
              />
            )}
          </CapabilitiesLoader>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
