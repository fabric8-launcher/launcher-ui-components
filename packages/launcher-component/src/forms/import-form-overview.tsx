import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { ImportFormValue } from './import-form';

interface ImportOverviewProps {
  value: ImportFormValue;
  onClick: () => void;
}

export function ImportFormOverview(props: ImportOverviewProps) {

  if (!props.value.buildImage.imageName) {
    return (
      <EmptyState>
        <Title size="lg">You can import an existing application from a git location</Title>
        <EmptyStateBody>
          You will be able to run the application in a few seconds...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select Import</Button>
      </EmptyState>
    );
  }
  return (
    <EmptyState>
      <Title size="lg">
        We will import {props.value.repository.org}{props.value.repository.org ? '/' : ''}{props.value.repository.name}
      </Title>
    </EmptyState>
  );
}
