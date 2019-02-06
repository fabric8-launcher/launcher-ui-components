import {InputProps} from "../core/types";
import ItemPicker from "../item-picker/item-picker";
import * as React from "react";


interface RuntimeValue {
  runtimeId?: string;
}

interface RuntimeItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface RuntimePickerProps extends InputProps<RuntimeValue> {
  items: RuntimeItem[];
}

export function RuntimePicker(props: RuntimePickerProps) {
  const onChange = (v) => {
    props.onChange({runtimeId: v});
  };
  return (
    <ItemPicker value={props.value.runtimeId} onChange={onChange} items={props.items} group="runtime"/>
  )

}