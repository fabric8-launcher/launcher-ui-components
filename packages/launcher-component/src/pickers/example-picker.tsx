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
import { Catalog, filter, ExampleRuntime } from 'launcher-client';
import { InputProps } from '../core/types';
import _ from 'lodash';

export interface ExamplePickerValue {
  missionId?: string;
  runtimeId?: string;
  versionId?: string;
}

interface ExamplePickerProps extends InputProps<ExamplePickerValue> {
  catalog: Catalog;
}

export function ExamplePicker(props: ExamplePickerProps) {
  const query = { runtime: { id: '', name: '', version: {id: '', name: ''} } };
  const runtimesMap = _.keyBy(filter(query, props.catalog) as ExampleRuntime[], 'id');

  return (
    <React.Fragment>
      <DataList aria-label="select-mission">
        {
          props.catalog.missions.map((mission, i) => {
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
                style={{ cursor: 'pointer' }}
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
                    aria-label="Select Runtime"
                  >
                    {_.map(runtimesMap).map((runtime, index) => {
                      if (!props.value.runtimeId) {
                        props.value.runtimeId = runtime.id;
                      }
                      return (
                        <FormSelectOption
                          key={index}
                          value={runtime.id}
                          label={runtime.name}
                        />
                      );
                    }
                    )}
                  </FormSelect>
                  {props.value.runtimeId &&
                    <FormSelect
                      id={mission.id + 'version-select'}
                      value={props.value.versionId}
                      onChange={value => props.onChange({ ...props.value, versionId: value })}
                      aria-label="Select Version"
                    >
                      {(runtimesMap[props.value.runtimeId] as any).version.map((version, index) => {
                        if (!props.value.versionId) {
                          props.value.versionId = version.id;
                        }
                        return (
                          <FormSelectOption
                            key={index}
                            value={version.id}
                            label={version.name}
                          />
                        );
                      }
                      )}
                    </FormSelect>
                  }
                </DataListContent>
              </DataListItem>
            );
          })
        }
      </DataList>
    </React.Fragment>
  );
}
