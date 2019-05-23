import React, { Fragment, useState } from "react";
import { Stack, StackItem, Title } from "@patternfly/react-core";
import { PlusIcon } from "@patternfly/react-icons";
import { DependencyItem } from "launcher-client";
import { InputProps, Picker } from "../core/types";

import style from './quarkus-dependency.module.scss';

export interface DependencyValue {
  id: string;
  selected: boolean;
}

export interface QuarkusDependencyPickerValue {
  dependencies?: DependencyValue[];
}

interface QuarkusDependencyPickerProps extends InputProps<QuarkusDependencyPickerValue> {
  items: DependencyItem[];
}

type DependencyItemProps = DependencyItem & InputProps<DependencyValue>;

function DependencyItemComponent(props: DependencyItemProps) {
  const [active, setActive] = useState(false);
  const onChange = (selected) => {
    props.onChange({...props.value, selected});
  };
  const toggleSelect = () => {
    onChange(!props.value.selected);
  };

  return (
    <div
      className={`${style.item} ${active ? style.active : ''}`}
      onMouseEnter={() => setActive(!active)}
      onMouseLeave={() => setActive(!active)}
      onClick={toggleSelect}
    >
      <Stack style={{position: 'relative'}}>
        <StackItem isMain>
          <Title size="sm" aria-label={`Pick ${props.id} dependency`}>{props.name}</Title>
          <span className={style.category}>{props.category}</span>
          {active && <PlusIcon className={style.icon}/>}
        </StackItem>
        <StackItem isMain={false}>{props.description}</StackItem>
      </Stack>
    </div>
  )
}

export const QuarkusDependencyPicker: Picker<QuarkusDependencyPickerProps, QuarkusDependencyPickerValue> = {
  checkCompletion: (value: QuarkusDependencyPickerValue) => !!value.dependencies && value.dependencies.filter(c => c.selected).length > 0,
  Element: (props: QuarkusDependencyPickerProps) => {
    const dependencies = props.value.dependencies || [];
    const dependenciesValuesById = new Map(dependencies.map(i => [i.id, i] as [string, DependencyValue]));

    const onChange = (value: DependencyValue) => {
      dependenciesValuesById.set(value.id, {...dependenciesValuesById.get(value.id)!, ...value});
      props.onChange({dependencies: Array.from(dependenciesValuesById.values())});
    };

    return (
      <Fragment>
        <div aria-label="Select dependencies" className={style.quarkusDependencyList}>
          {
            props.items.map((dep, i) => (
              <DependencyItemComponent
                {...dep}
                key={i}
                value={dependenciesValuesById.get(dep.id) || { id: dep.id, selected: false }}
                onChange={onChange}
              />
            ))
          }
        </div>
      </Fragment>
    );
  }
}