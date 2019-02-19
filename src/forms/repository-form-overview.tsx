import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { RepositoryFormValue } from './repository-form';
import { normalizeRepositoryPath } from '../pickers/repo-picker/repo-picker';

interface RepositoryFormOverviewProps {
  value: RepositoryFormValue;
  onClick: () => void;
}

export function RepositoryFormOverview(props: RepositoryFormOverviewProps) {

  if (!props.value.repo) {
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
    <EmptyState>
      <Title size="lg">Your code will be located in '{normalizeRepositoryPath(props.value.repo)}'</Title>
    </EmptyState>
  );
}
