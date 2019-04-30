import * as React from 'react';
import { Card, CardBody, CardHeader, Gallery, GalleryItem, Radio, Title, CardFooter, FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { InputProps } from '../types';
import style from './item-picker.module.scss';
import classNames from 'classnames';
import { Runtime } from '../../loaders/new-app-runtimes-loaders';

interface ListItemProps extends Runtime {
  selected?: boolean;
  versionId?: string;
  group: string;
  onSelect: (id: string, versionId?: string) => void;
}

function ListItem(props: ListItemProps) {
  const { onSelect, selected = false } = props;
  const doOnSelect = (sel) => {
    let versionId = props.versionId;
    if (!versionId) {
      versionId = props.versions[0].id;
    }
    onSelect(props.id, versionId);
  };
  return (
    <Card onClick={doOnSelect} className={classNames(style.card, { [style.selected]: selected })}>
      <CardHeader className={style.header}>
        <Radio
          aria-label={`Choose ${props.id} as ${props.group}`}
          value={props.id}
          checked={selected}
          onChange={doOnSelect}
          name={props.group}
          id={`radio-choose-${props.id}-as-${props.group}`}
        />
        <Title size="lg">{props.name}</Title>
      </CardHeader>
      <CardBody className={style.body}>
        <img src={props.icon} />
        <p>
          {props.description}
        </p>
      </CardBody>
      <CardFooter style={props.versions.length === 0 ? { visibility: 'hidden' } : {}}>
        <FormGroup
          label="Version"
          fieldId="version-select"
        >
          <FormSelect
            id="version-select"
            value={props.versionId}
            onChange={versionId => onSelect(props.id, versionId)}
            aria-label="Select version"
          >
            {props.versions.length !== 0 && props.versions.map((version, index) => (
              <FormSelectOption
                key={index}
                value={version.id}
                label={version.name}
              />
            ))
            }
          </FormSelect>
        </FormGroup>
      </CardFooter>
    </Card>
  );
}

interface ItemPickerProps extends InputProps<string | undefined> {
  group: string;
  items?: Runtime[];
}

function ItemPicker(props: ItemPickerProps) {
  const items = props.items || [];

  return (
    <Gallery gutter="md">
      {
        items.map((viewItem, i) => (
          <GalleryItem key={i}>
            <ListItem
              {...viewItem}
              group={props.group}
              onSelect={props.onChange}
              selected={props.value === viewItem.id}
            />
          </GalleryItem>
        ))
      }
    </Gallery>
  );
}

export default ItemPicker;
