import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { isDestRepositoryFromValueValid, DestRepositoryFormValue } from './dest-repository-form';
import { normalizeRepositoryPath } from '../pickers/user-repository-picker';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { SpecialValue } from '../core/stuff';

interface RepositoryFormOverviewProps {
  value: DestRepositoryFormValue;
  onClick: () => void;
}

export function SrcLocationFormOverview(props: RepositoryFormOverviewProps) {

  if (!isDestRepositoryFromValueValid(props.value)) {
    return (
      <EmptyState>
        <Title size="lg">You can select where your application code will be located.</Title>
        <EmptyStateBody>
          You will be able to choose a repository provider and a location...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select Destination Repository</Button>
      </EmptyState>
    );
  }
  return (
    <OverviewComplete title={`Destination Repository is configured'`}>
      You selected <SpecialValue>{normalizeRepositoryPath(props.value.repository)}</SpecialValue> as destination repository.
    </OverviewComplete>
  );
}
