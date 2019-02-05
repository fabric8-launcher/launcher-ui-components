import * as React from "react";
import {useEffect, useState} from "react";
import {
  Button,
  DataList,
  DataListCell,
  DataListCheck,
  DataListContent,
  DataListItem,
  Title,
  Toolbar,
  ToolbarGroup
} from "@patternfly/react-core";
import {FieldEnum} from "./fields/field-enum";

interface Field {
  id: string;
  name: string;
  description: string;
  required: boolean;
  values?: Array<{ id: string, name: string }>
  type: string;
  default?: string
}

interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  category: string;
  fields?: Field[];
  icon?: string;
  disabled?: boolean;
}

interface CapabilityValue {
  id: string;
  selected: boolean;
  data?: any;
}

type CapabilityItemProps = CapabilityItem & {
  value: CapabilityValue;
  onChange(value: CapabilityValue): void;
}


function CapabilityItem(props: CapabilityItemProps) {
  const onChangeSelected = (selected) => {
    props.onChange({...props.value, selected})
  };

  const onChangeData = (data) => {
    props.onChange({...props.value, data})
  };
  const elId = `toggle-capability-props-form-${props.id}`;
  const fields = (props.fields || []).filter(f => f.type === 'enum');
  return (
    <DataListItem aria-labelledby={props.id} isExpanded={props.value.selected}>
      <DataListCheck aria-labelledby={elId} name="Selection item check" onChange={onChangeSelected}
                     checked={props.value.selected} isDisabled={props.disabled}/>
      <DataListCell width={1} style={{flex: 'none'}}><img src={props.icon}/></DataListCell>
      <DataListCell width={1}><Title size="lg">{props.name}</Title></DataListCell>
      <DataListCell width={3}>{props.description}</DataListCell>
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

interface SelectCapabilitiesProps {
  items: CapabilityItem[];
  value?: CapabilityValue[]

  onSave?(value: CapabilityValue[]);
  onCancel?();
}

export function CapabilitiesPicker(props: SelectCapabilitiesProps) {

  const [value, setValue] = useState<CapabilityValue[]>(props.value || [] );

  useEffect(() => {
    if(props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const capabilitiesValuesById = new Map(value.map(i => [i.id, i] as [string, CapabilityValue]));

  const onChange = (value: CapabilityValue) => {
    capabilitiesValuesById.set(value.id, {...capabilitiesValuesById.get(value.id)!, ...value});
    setValue(Array.from(capabilitiesValuesById.values()));
  };

  const onSave = () => {
    if (props.onSave) {
      props.onSave(value);
    }
  };

  const onCancel = () => {
    setValue(props.value || []);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <div className="select-capabilities" style={{padding: '20px'}}>
      <DataList aria-label="select-capability">
        {
          props.items.map((cap, i) => (
            <CapabilityItem
              {...cap}
              key={i}
              value={capabilitiesValuesById.get(cap.id) || { id: cap.id, selected: false }}
              onChange={onChange}
            />
          ))
        }
      </DataList>
      <Toolbar style={{marginTop: '20px'}}>
        <ToolbarGroup>
          <Button variant="primary" onClick={onSave}>Save</Button>
        </ToolbarGroup>
        <ToolbarGroup>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
}