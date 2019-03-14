import * as React from 'react';
import {
  DataList,
  DataListCell,
  DataListContent,
  DataListItem,
  Radio,
  Title,
  FormSelect,
  FormSelectOption,
  Button,
  Split,
  SplitItem
} from '@patternfly/react-core';
import { Catalog, filter, ExampleRuntime, ExampleMission } from 'launcher-client';
import { InputProps, Picker } from '../core/types';
import _ from 'lodash';

export interface ExamplePickerValue {
  missions?: ExampleMission[];
  missionId?: string;
  runtimeId?: string;
  versionId?: string;
}

interface ExamplePickerProps extends InputProps<ExamplePickerValue> {
  catalog: Catalog;
}

export const ExamplePicker: Picker<ExamplePickerProps, ExamplePickerValue> = {
  checkCompletion: value => !!value.missionId && !!value.runtimeId && !!value.versionId,
  Element: props => {
    const query = { runtime: { id: '', name: '', version: { id: '', name: '' } } };
    const missionQuery = { mission: { id: '', name, description: '', runtime: { id: '', name, version: { name, id: '' } } } };
    const runtimesMap = _.keyBy(filter(query, props.catalog) as ExampleRuntime[], 'id');
    const missions = !props.value.missions ? filter(missionQuery, props.catalog) as ExampleMission[] : props.value.missions;
    const filterCatalog = (runtime) => {
      props.onChange({
        ...props.value, runtimeId: runtime,
        missions: (filter({
          mission: {
            id: '', name, description: '', runtime:
              { id: runtime, name, version: { name, id: '' } }
          }
        }, props.catalog) as ExampleMission[]).filter(m => !!m.runtime)
      });
    };

    return (
      <React.Fragment>
        <Split>
          <SplitItem isMain>
            Already decided what runtime you want to use? Select it here:
        </SplitItem>
          <SplitItem isMain={false}>
            <Button variant="tertiary" onClick={() => props.onChange({ ...props.value, missions: undefined, runtimeId: '' })}>Any</Button>
            {_.map(runtimesMap).map((runtime, index) => (
              <Button
                variant="tertiary"
                key={index}
                onClick={() => filterCatalog(runtime.id)}
                isDisabled={props.value.runtimeId === runtime.id}
              >
                {runtime.name}
              </Button>
            ))}
          </SplitItem>
        </Split>
        <DataList aria-label="select-mission">
          {
            missions!.map((mission, i) => {
              const isSelected = props.value.missionId === mission.id;
              const onChangeSelected = () => {
                props.onChange({ ...props.value, missionId: mission.id });
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
                      isDisabled={mission.runtime!.length === 1}
                      id={mission.id + 'runtime-select'}
                      value={props.value.runtimeId}
                      onChange={value => props.onChange({ ...props.value, runtimeId: value })}
                      aria-label="Select Runtime"
                    >
                      {mission.runtime!.length !== 1 && <FormSelectOption
                        value=""
                        label="Select a Runtime"
                      />}
                      {mission.runtime!.map((runtime, index) => (
                        <FormSelectOption
                          key={index}
                          value={runtime.id}
                          label={runtime.name}
                        />
                      ))
                      }
                    </FormSelect>
                    {props.value.runtimeId &&
                      <FormSelect
                        id={mission.id + 'version-select'}
                        value={props.value.versionId}
                        onChange={value => props.onChange({ ...props.value, versionId: value })}
                        aria-label="Select Version"
                      >
                        <FormSelectOption
                          key={-1}
                          value=""
                          label="Select a Version"
                        />
                        {(runtimesMap[props.value.runtimeId] as any).version.map((version, index) => (
                          <FormSelectOption
                            key={index}
                            value={version.id}
                            label={version.name}
                          />
                        ))
                        }
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

};
