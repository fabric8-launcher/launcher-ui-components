import {InputProps} from "../../core/types";
import {DescriptiveHeader} from "../../core/descriptive-header";
import * as React from "react";
import {RuntimePicker, RuntimePickerValue} from "../runtime-picker/runtime-picker";
import {EnumsRuntimesLoader} from "../runtime-picker/enums-runtimes-loader";

export interface FrontendPickerValue {
  runtime?: RuntimePickerValue;
}

export function isFrontendPickerValueValid(value: FrontendPickerValue) {
  return !!value.runtime;
}

export const defaultFrontendPickerValue: FrontendPickerValue = {
};


interface FrontendPickerProps extends InputProps<FrontendPickerValue> {
}


export function FrontendHeader() {
  return (
    <DescriptiveHeader title="Frontend"
                       description="You may optionally select a frontend application to bootstrap your web-based development. These options scaffold a starting point in your framework of choice."/>

  );
}


export function FrontendPicker(props: FrontendPickerProps) {
  return (
    <React.Fragment>
      <FrontendHeader/>
      <EnumsRuntimesLoader category="frontend">
        {(items) => (
          <RuntimePicker items={items} value={props.value.runtime}
                         onChange={(runtime) => props.onChange({...props.value, runtime})}/>
        )}
      </EnumsRuntimesLoader>
    </React.Fragment>
  );
}

