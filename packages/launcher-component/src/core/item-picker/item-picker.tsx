import * as React from 'react';
import { Card, CardBody, CardHeader, Gallery, GalleryItem, Radio, Title } from '@patternfly/react-core';
import { InputProps } from '../types';
import * as style from './item-picker.module.scss';
import classNames from 'classnames';

export interface ViewItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface ListItemProps extends ViewItem {
  selected?: boolean;
  group: string;
  onSelect: (id: string) => void;
}

function ListItem(props: ListItemProps) {
  const {onSelect, selected = false} = props;
  const doOnSelect = (sel) => {
    onSelect(props.id);
  };
  return (
    <Card onClick={doOnSelect} className={classNames({selected})}>
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
      <CardBody>
        <img src={props.icon}/>
        <p>
          {props.description}
        </p>
      </CardBody>
    </Card>
  );
}

interface ItemPickerProps extends InputProps<string | undefined> {
  group: string;
  items?: ViewItem[];
}

function ItemPicker(props: ItemPickerProps) {
  const items = props.items || [];

  return (
    <div className={style.itemPicker}>
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
    </div>
  );
}

export default ItemPicker;
