import * as React from "react";
import { DataList, DataListItem, DataListCell, Title, DataListCheck, DataListToggle, DataListContent } from "@patternfly/react-core";
import { Example, ExampleMission } from "launcher-client";
import { InputProps } from "../../core/types";

export type ExamplePickerValue = Example;

interface ExamplePickerProps extends InputProps<ExamplePickerValue> {
  examples: Example[];
  missions: ExampleMission[];
}

export function ExamplePicker(props: ExamplePickerProps) {
  const onChangeSelected = (selected) => {
    props.onChange({ ...props.value, selected })
  };
  return (
    <React.Fragment>
      <DataList aria-label="select-mission">
        {
          props.missions.map((mission, i) => (
            <DataListItem isExpanded={props.value.name === mission.name} aria-labelledby={mission.name} value={mission.id}
              {...mission}
              key={i}>
              <DataListToggle
                isExpanded={props.value.name === mission.name}
                id={mission.id}
                aria-labelledby={mission.id}
                aria-label={"Toggle details for " + mission.name}
              />
              <DataListCheck aria-labelledby={mission.name} name={mission.id} onChange={onChangeSelected}/>
              <DataListCell width={1}><Title size="lg">{mission.name}</Title></DataListCell>
              <DataListCell width={2}>{mission.description}</DataListCell>
              <DataListContent aria-label={"Detail for " + mission.name} isHidden={props.value.name !== mission.name}>
                <p>
                  Version and runtime selected...
                </p>
              </DataListContent>
            </DataListItem>
          ))
        }
      </DataList>
    </React.Fragment>
  );
}