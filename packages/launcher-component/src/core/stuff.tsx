import { Title } from '@patternfly/react-core';
import * as React from 'react';

import style from './stuff.module.scss';

export function Separator() {
  return (
    <hr className={style.separator}/>
  );
}

export function DescriptiveHeader(props: { title?: string, description: string }) {
  return (
    <div className={style.descriptiveHeader}>
      {props.title && (<Title size="lg">{props.title}</Title>)}
      <p>{props.description}</p>
    </div>
  );
}

export function SpecialValue(props: { children: string }) {
  return (
    <span className={style.specialValue}>'{props.children}'</span>
  );
}
