import {InputProps} from "../../core/types";
import {DescriptiveHeader} from "../../core/descriptive-header";
import * as React from "react";
import {RuntimePicker} from "../runtime-picker/runtime-picker";
import {EnumsRuntimesLoader} from "../runtime-picker/enums-runtimes-loader";

interface FrontendValue {
  runtime?: {
    id: string;
  };
}

export function isFrontendValueValid(value: FrontendValue) {
  return !!value.runtime;
}

export const defaultFrontendValue: FrontendValue = {
};


interface FrontendPickerProps extends InputProps<FrontendValue> {
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

