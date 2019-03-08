import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { SrcLocationFormValue } from './src-location-form';
import { normalizeRepositoryPath } from '../pickers/repository-picker';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';

interface RepositoryFormOverviewProps {
  value: SrcLocationFormValue;
  onClick: () => void;
}

export function SrcLocationFormOverview(props: RepositoryFormOverviewProps) {

  if (!props.value.repository) {
    return (
      <EmptyState>
        <Title size="lg">You can select where your application source code will be located.</Title>
        <EmptyStateBody>
          You will be able to choose a repository provider and a location...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select Repository</Button>
      </EmptyState>
    );
  }
  return (
    <OverviewComplete title={`Your code will be located in '${normalizeRepositoryPath(props.value.repository)}'`} />
  );
}
