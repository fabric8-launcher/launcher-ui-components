import { EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import * as React from 'react';
import style from './hub-n-spoke.module.scss';

export function OverviewComplete(props: { title: string; children?: React.ReactNode }) {
  return (
    <EmptyState>
      <Title size="lg"><CheckCircleIcon className={style.checkComplete}/>{props.title}</Title>
      {props.children && (<EmptyStateBody>{props.children}</EmptyStateBody>)}
    </EmptyState>
  );
}
