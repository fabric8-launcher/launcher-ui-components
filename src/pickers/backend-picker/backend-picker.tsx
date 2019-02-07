import {CapabilitiesPicker, CapabilityValue} from "../capabilities-picker/capabilities-picker";
import {InputProps} from "../../core/types";
import {DescriptiveHeader} from "../../core/descriptive-header";
import * as React from "react";
import {RuntimePicker} from "../runtime-picker/runtime-picker";
import {RuntimesLoader} from "../runtime-picker/runtimes-loader";
import {CapabilitiesItemsLoader} from "../capabilities-picker/capability-loader";

interface BackendValue {
  runtime?: {
    id: string;
  };
  capabilities: CapabilityValue[];
}

export const defaultBackendValue: BackendValue = {
  capabilities: [],
};


interface BackendPickerProps extends InputProps<BackendValue> {
}

export function CapabilitiesHeader() {
  return (
    <DescriptiveHeader title="Capabilities" description="Capabilities specify what your application can do. Select from the below, and we'll wire your application code,
        services, and OpenShift together end-to-end. When done, our friendly Welcome Application will show you how
        everything works."/>
  );
}

export function RuntimeHeader() {
  return (
    <DescriptiveHeader title="Runtime"
                       description="Runtimes power the server-side processing of your application, and we can get you set up in one of several languages and frameworks. If you're looking to expose an HTTP API or interact with services like a database, choosing one here will hook that together for you."/>

  );
}


export function BackendPicker(props: BackendPickerProps) {
  return (
    <React.Fragment>
      <RuntimeHeader/>
      <RuntimesLoader category="backend">
        {(items) => (
          <RuntimePicker items={items} value={props.value.runtime}
                         onChange={(runtime) => props.onChange({...props.value, runtime})}/>
        )}
      </RuntimesLoader>
      {props.value.runtime && (
        <React.Fragment>
          <CapabilitiesHeader/>
          <CapabilitiesItemsLoader categories={["backend", "support"]}>
            {(items) => (
              <CapabilitiesPicker items={items} value={props.value.capabilities}
                                  onChange={(capabilities) => props.onChange({...props.value, capabilities})}/>
            )}
          </CapabilitiesItemsLoader>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

