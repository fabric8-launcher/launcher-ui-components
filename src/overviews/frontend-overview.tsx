import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { FrontendPickerValue } from '../pickers/frontend-picker/frontend-picker';
import { RuntimeLoader } from '../loaders/enums-runtimes-loaders';

interface FrontendOverviewProps {
  value: FrontendPickerValue;
  onClick: () => void;
}

export function FrontendOverview(props: FrontendOverviewProps) {

  if (!props.value.runtime) {
    return (
      <EmptyState>
        <Title size="lg">You can select a Frontend for your custom application</Title>
        <EmptyStateBody>
          You will be able to bootstrap the frontend of your application in a few seconds...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select Frontend</Button>
      </EmptyState>
    );
  }
  return (
    <RuntimeLoader id={props.value.runtime.id}>
      {runtime => (
        <EmptyState>
          <Title size="lg">Your Frontend will run on {runtime!.name}</Title>
        </EmptyState>
      )}
    </RuntimeLoader>
  );
}
