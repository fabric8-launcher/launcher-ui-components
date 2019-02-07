import {CapabilityValue} from "../capabilities-picker/capabilities-picker";
import {InputProps} from "../../core/types";
import {DescriptiveHeader} from "../../core/descriptive-header";
import * as React from "react";

interface BackendValue {
  runtime?: string;
  capabilities?: CapabilityValue[];
}


interface BackendPickerProps extends InputProps<BackendValue> {
}

export function CapabilityHeader() {
  return (
    <DescriptiveHeader title="Capabilities" description="Capabilities specify what your application can do. Select from the below, and we'll wire your application code,
        services, and OpenShift together end-to-end. When done, our friendly Welcome Application will show you how
        everything works."/>
  );
}

export function BackendPicker(props: BackendPickerProps) {
  if (!props.value.runtime) {

  }
  return (<div/>
  );
}

