import {CapabilityValue} from "../capabilities-picker/capabilities-picker";
import {InputProps} from "../core/types";

interface BackendValue {
  runtime?: string;
  capabilities?: CapabilityValue[];
}


interface BackendPickerProps extends InputProps<BackendValue> {
}

export function BackendPicker(props: BackendPickerProps) {


}