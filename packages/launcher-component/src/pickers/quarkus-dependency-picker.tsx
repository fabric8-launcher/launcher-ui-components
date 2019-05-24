import { Grid, GridItem, Stack, StackItem, TextInput, Title } from "@patternfly/react-core";
import { PlusIcon, TimesIcon } from "@patternfly/react-icons";
import { DependencyItem } from "launcher-client";
import React, { Fragment, useState } from "react";
import { InputProps, Picker } from "../core/types";
import style from './quarkus-dependency.module.scss';

export interface DependencyValue {
  id: string;
  name?: string;
  description?: string;
  category?: string;
}

export interface QuarkusDependencyPickerValue {
  dependencies?: string[];
}

interface QuarkusDependencyPickerProps extends InputProps<QuarkusDependencyPickerValue> {
  items: DependencyItem[];
}

enum OperationType {
  Add = 1,
  Remove,
}

interface DependencyItemProps extends DependencyItem, InputProps<DependencyValue> {
  operation?: OperationType;
}

function DependencyItemComponent(props: DependencyItemProps) {
  const [active, setActive] = useState(false);
  const onChange = () => {
    props.onChange({ ...props });
  };

  return (
    <div
      className={`${style.item} ${active ? style.active : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={onChange}
    >
      <Stack style={{ position: 'relative' }}>
        <StackItem isMain>
          <Title size="sm" aria-label={`Pick ${props.id} dependency`}>{props.name}</Title>
          <span className={style.category}>{props.category}</span>
          {active && (props.operation === OperationType.Add ?
            <PlusIcon className={style.icon} /> : <TimesIcon className={style.icon} />)}
        </StackItem>
        <StackItem isMain={false}>{props.description}</StackItem>
      </Stack>
    </div>
  )
}

export const QuarkusDependencyPicker: Picker<QuarkusDependencyPickerProps, QuarkusDependencyPickerValue> = {
  checkCompletion: (value: QuarkusDependencyPickerValue) => !!value.dependencies && value.dependencies.length > 0,
  Element: (props: QuarkusDependencyPickerProps) => {
    const [filter, setFilter] = useState('');
    const dependencies = props.value.dependencies || [];
    const dependenciesValuesById = new Map(dependencies.map(id => [id, props.items.find(d => d.id === id)]));

    const onChange = (value: DependencyItemProps) => {
      if (value.operation === OperationType.Add) {
        const { operation, ...changed } = value;
        dependenciesValuesById.set(value.id, changed);
      } else {
        dependenciesValuesById.delete(value.id);
      }
      props.onChange({ dependencies: Array.from(dependenciesValuesById.keys()) });
    };

    const filterFunction = (d: DependencyItem) =>
      filter !== '' && (d.description.toLowerCase().includes(filter.toLowerCase())
        || d.name.toLowerCase().includes(filter.toLowerCase()));
    const result = props.items.filter(filterFunction);

    return (
      <Fragment>
        <Grid gutter="md">
          <GridItem span={8}>
            <TextInput
              aria-label="Search dependencies"
              placeholder="CDI, Netty, Hibernate, Vert.x..."
              value={filter}
              onChange={value => setFilter(value)}
            />
            <div aria-label="Select dependencies" className={style.quarkusDependencyList}>
              {
                result.map((dep, i) => (
                  <DependencyItemComponent
                    operation={OperationType.Add}
                    {...dep}
                    key={i}
                    value={dependenciesValuesById.get(dep.id) || { id: dep.id }}
                    onChange={onChange}
                  />
                ))
              }
              { filter && !result.length && <Title size="xs">No result.</Title>}
            </div>
          </GridItem>
          <GridItem span={4}>
            <Title size="md">Selected:</Title>
            <div className={style.quarkusDependencyList}>
              {
                Array.from(dependenciesValuesById.values()).map((selected, i) => (
                  <DependencyItemComponent
                    operation={OperationType.Remove}
                    {...selected as DependencyItem}
                    key={i}
                    value={selected || { id: '' }}
                    onChange={onChange}
                  />
                ))
              }
            </div>
          </GridItem>
        </Grid>
      </Fragment>
    );
  }
}