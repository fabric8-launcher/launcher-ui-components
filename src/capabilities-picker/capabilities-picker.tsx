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
  selected: boolean;
  data?: any;
  disabled?: boolean;
}

type CapabilityElementProps = CapabilityItem & {
  onChange(changes: { id: string, selected: boolean, data?: any }): void;
}


function CapabilityElement(props: CapabilityElementProps) {
  const onChangeSelected = (selected) => {
    props.onChange({id: props.id, selected, data: props.data})
  };

  const onChangeData = (data) => {
    props.onChange({id: props.id, data, selected: props.selected})
  };
  const elId = `toggle-capability-props-form-${props.id}`;
  const fields = (props.fields || []).filter(f => f.type === 'enum');
  return (
    <DataListItem aria-labelledby={props.id} isExpanded={props.selected}>
      <DataListCheck aria-labelledby={elId} name="Selection item check" onChange={onChangeSelected}
                     checked={props.selected} isDisabled={props.disabled}/>
      <DataListCell width={1} style={{flex: 'none'}}><img src={props.icon}/></DataListCell>
      <DataListCell width={1}><Title size="lg">{props.name}</Title></DataListCell>
      <DataListCell width={3}>{props.description}</DataListCell>
      {fields.length > 0 && props.selected && (
        <DataListContent isHidden={!props.selected} aria-label={`capability-props-form-${props.id}`}>
          {fields.map(f => {
            const selectedValue = (props.data && props.data[f.id]) || f.default;
            const onFieldChange = (v) => {
              const newData = {...props.data, [f.id]: v};
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

export interface FieldValue {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  metadata?: object;
}

interface SelectCapabilitiesProps {
  items: CapabilityItem[];

  onSave?(items: CapabilityItem[]);

  onCancel?();
}

export function CapabilitiesPicker(props: SelectCapabilitiesProps) {

  const [items, setItems] = useState<CapabilityItem[]>(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const itemsMap = new Map(items.map(i => [i.id, i] as [string, CapabilityItem]));

  const onChange = (changes: { id: string, selected: boolean, data?: any }) => {
    itemsMap.set(changes.id, {...itemsMap.get(changes.id)!, ...changes});
    setItems(Array.from(itemsMap.values()));
  };

  const onSave = () => {
    if (props.onSave) {
      props.onSave(items);
    }
  };

  const onCancel = () => {
    setItems(props.items);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <div className="select-capabilities" style={{padding: '20px'}}>
      <DataList aria-label="select-capability">
        {
          items.map((cap, i) => (
            <CapabilityElement
              {...cap}
              key={i}
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