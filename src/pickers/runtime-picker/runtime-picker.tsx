import {InputProps} from "../../core/types";
import ItemPicker from "../../core/item-picker/item-picker";
import * as React from "react";


interface RuntimeValue {
  id: string;
}

export interface RuntimeItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface RuntimePickerProps extends InputProps<RuntimeValue | undefined> {
  items: RuntimeItem[];
}

export const defaultRuntimePickerValue = undefined;

export function RuntimePicker(props: RuntimePickerProps) {
  const onChange = (id) => {
    props.onChange({id});
  };
  return (
    <ItemPicker value={props.value && props.value.id} onChange={onChange} items={props.items} group="runtime"/>
  )

}