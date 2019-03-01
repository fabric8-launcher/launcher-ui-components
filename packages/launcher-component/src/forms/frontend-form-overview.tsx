import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { RuntimeLoader } from '../loaders/enums-runtimes-loaders';
import { FrontendFormValue } from './frontend-form';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';

interface FrontendOverviewProps {
  value: FrontendFormValue;
  onClick: () => void;
}

export function FrontendFormOverview(props: FrontendOverviewProps) {

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
        <OverviewComplete title={`Your ${runtime!.name} frontend is configured`} />
      )}
    </RuntimeLoader>
  );
}
