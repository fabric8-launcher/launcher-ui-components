import * as React from "react";
import {DataList, DataListCell, DataListCheck, DataListContent, DataListItem, Title} from "@patternfly/react-core";
import {FieldEnum} from "./fields/field-enum";
import {InputProps} from "../../core/types";

interface Field {
  id: string;
  name: string;
  description: string;
  required: boolean;
  values?: Array<{ id: string, name: string }>
  type: string;
  default?: string
}

export interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  category: string;
  fields?: Field[];
  icon?: string;
  disabled?: boolean;
}

export interface CapabilityValue {
  id: string;
  selected: boolean;
  data?: any;
}

type CapabilityItemProps = CapabilityItem & InputProps<CapabilityValue>

export const defaultCapabilitiesPickerValue = [
  {id: 'welcome', selected: true},
];


function CapabilityItem(props: CapabilityItemProps) {
  const onChangeSelected = (selected) => {
    props.onChange({...props.value, selected})
  };

  const onChangeData = (data) => {
    props.onChange({...props.value, data})
  };
  const elId = `toggle-capability-props-form-${props.id}`;
  const fields = (props.fields || []).filter(f => f.type === 'enum');
  const toggleSelect = () => onChangeSelected(!props.value.selected);
  return (
    <DataListItem aria-labelledby={props.id} isExpanded={props.value.selected}>
      <DataListCheck aria-labelledby={elId} name="Selection item check" onChange={onChangeSelected}
                     checked={props.value.selected} isDisabled={props.disabled}/>
      <DataListCell width={1} style={{flex: 'none', cursor: 'pointer'}}
                    onClick={toggleSelect}>
        <img src={props.icon}/>
      </DataListCell>
      <DataListCell width={1} onClick={toggleSelect} style={{cursor: 'pointer'}}>
        <Title size="lg">{props.name}</Title>
      </DataListCell>
      <DataListCell width={3}
                    onClick={toggleSelect}
                    style={{cursor: 'pointer'}}>
        {props.description}
      </DataListCell>
      {fields.length > 0 && props.value.selected && (
        <DataListContent isHidden={!props.value.selected} aria-label={`capability-props-form-${props.id}`}>
          {fields.map(f => {
            const selectedValue = (props.value.data && props.value.data[f.id]) || f.default;
            const onFieldChange = (v) => {
              const newData = {...props.value.data, [f.id]: v};
              onChangeData(newData);
            };
            return (
              <FieldEnum key={f.id} parent={props.id} id={f.id} name={f.name} description={f.description}
                         values={f.values!}
                         required={f.required} value={selectedValue}
                         onChange={onFieldChange}
              />
            );
          })}
        </DataListContent>
      )}
    </DataListItem>
  );
}

export type CapabilitiesPickerValue = CapabilityValue[];

interface CapabilitiesPickerProps extends InputProps<CapabilitiesPickerValue> {
  items: CapabilityItem[];
}

export function CapabilitiesPicker(props: CapabilitiesPickerProps) {

  const capabilitiesValuesById = new Map(props.value.map(i => [i.id, i] as [string, CapabilityValue]));

  const onChange = (value: CapabilityValue) => {
    capabilitiesValuesById.set(value.id, {...capabilitiesValuesById.get(value.id)!, ...value});
    props.onChange(Array.from(capabilitiesValuesById.values()));
  };

  return (
    <React.Fragment>
      <DataList aria-label="select-capability" className="select-capabilities">
        {
          props.items.map((cap, i) => (
            <CapabilityItem
              {...cap}
              key={i}
              value={capabilitiesValuesById.get(cap.id) || {id: cap.id, selected: false}}
              onChange={onChange}
            />
          ))
        }
      </DataList>
    </React.Fragment>
  );
}