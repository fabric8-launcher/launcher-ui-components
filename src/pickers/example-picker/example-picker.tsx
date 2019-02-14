import * as React from 'react';
import {
  DataList,
  DataListCell,
  DataListContent,
  DataListItem,
  Radio,
  Title,
  FormSelect,
  FormSelectOption
} from '@patternfly/react-core';
import { ExampleMission, ExampleRuntime } from 'launcher-client';
import { InputProps } from '../../core/types';


export interface ExamplePickerValue {
  missionId?: string;
  runtimeId?: string;
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
            const isSelected = props.value.missionId === mission.id;
            const onChangeSelected = () => {
              props.onChange({ missionId: mission.id });
            };
            return (
              <DataListItem
                isExpanded={isSelected}
                aria-labelledby={mission.name}
                value={mission.id}
                key={i}
                style={{cursor: 'pointer'}}
              >
                <DataListCell width={1} style={{ flex: 'none' }}>
                  <Radio
                    aria-label={`Choose ${mission.name} as mission`}
                    value={mission.id}
                    checked={isSelected}
                    onChange={onChangeSelected}
                    name="mission"
                    id={`radio-choose-${mission.id}-as-mission`}
                  />
                </DataListCell>
                <DataListCell width={1} onClick={onChangeSelected}><Title size="lg">{mission.name}</Title></DataListCell>
                <DataListCell width={2} onClick={onChangeSelected}>{mission.description}</DataListCell>
                <DataListContent aria-label={'Detail for ' + mission.name} isHidden={!isSelected}>
                  <FormSelect
                    id={mission.id + 'runtime-select'}
                    value={props.value.runtimeId}
                    onChange={value => props.onChange({ ...props.value, runtimeId: value })}
                    aria-label="Select Runtime">
                    {props.runtimes.map((runtime, index) => (
                      <FormSelectOption
                        key={index}
                        value={runtime.id}
                        label={runtime.name}
                      />
                    ))}
                  </FormSelect>
                </DataListContent>
              </DataListItem>
            );
          })
        }
      </DataList>
    </React.Fragment>
  );
}
