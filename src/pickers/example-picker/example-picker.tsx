import * as React from 'react';
import {useState} from 'react';
import {
  DataList,
  DataListCell,
  DataListContent,
  DataListItem,
  Radio,
  Title,
  Dropdown,
  DropdownItem,
  DropdownToggle
} from '@patternfly/react-core';
import {ExampleMission, ExampleRuntime} from 'launcher-client';
import {InputProps} from '../../core/types';


export interface ExamplePickerValue {
  missionId?: string;
}

interface ExamplePickerProps extends InputProps<ExamplePickerValue> {
  missions: ExampleMission[];
  runtimes: ExampleRuntime[];
}

export function ExamplePicker(props: ExamplePickerProps) {
  return (
    <React.Fragment>
      <DataList aria-label="select-mission">
        {
          props.missions.map((mission, i) => {
            const [open, setOpen] = useState(false);
            const isSelected = props.value.missionId === mission.id;
            const onChangeSelected = () => {
              props.onChange({missionId: mission.id});
            };
            return (
              <DataListItem
                isExpanded={isSelected}
                aria-labelledby={mission.name}
                value={mission.id}
                key={i}
                onClick={onChangeSelected}
                style={{cursor: 'pointer'}}
              >
                <DataListCell width={1} style={{flex: 'none'}}>
                  <Radio
                    aria-label={`Choose ${mission.name} as mission`}
                    value={mission.id}
                    checked={isSelected}
                    onChange={onChangeSelected}
                    name="mission"
                    id={`radio-choose-${mission.id}-as-mission`}
                  />
                </DataListCell>
                <DataListCell width={1}><Title size="lg">{mission.name}</Title></DataListCell>
                <DataListCell width={2}>{mission.description}</DataListCell>
                <DataListContent aria-label={'Detail for ' + mission.name} isHidden={!isSelected}>
                  <Dropdown
                    onSelect={() => { }}
                    toggle={<DropdownToggle onToggle={setOpen}>Select Runtime</DropdownToggle>}
                    isOpen={open}
                    dropdownItems={props.runtimes.map((runtime) => (<DropdownItem key={runtime.id}>{runtime.name}</DropdownItem>))}
                  >
                  </Dropdown>
                </DataListContent>
              </DataListItem>
            );
          })
        }
      </DataList>
    </React.Fragment>
  );
}
