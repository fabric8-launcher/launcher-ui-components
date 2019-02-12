import * as React from 'react';
import {DataList, DataListCell, DataListContent, DataListItem, Radio, Title} from '@patternfly/react-core';
import {ExampleMission} from 'launcher-client';
import {InputProps} from '../../core/types';

export interface ExamplePickerValue {
  missionId?: string;
}

interface ExamplePickerProps extends InputProps<ExamplePickerValue> {
  missions: ExampleMission[];
}

export function ExamplePicker(props: ExamplePickerProps) {
  return (
    <React.Fragment>
      <DataList aria-label="select-mission">
        {
          props.missions.map((mission, i) => {
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
                  <p>
                    Version and runtime selected...
                  </p>
                </DataListContent>
              </DataListItem>
            );
          })
        }
      </DataList>
    </React.Fragment>
  );
}
