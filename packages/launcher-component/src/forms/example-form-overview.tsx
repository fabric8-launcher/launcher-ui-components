import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { ExamplePickerValue } from '../pickers/example-picker';
import { ExamplesLoader } from '../loaders/example-catalog-loader';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';

interface ExampleOverviewProps {
  value: ExamplePickerValue;
  onClick: () => void;
}

export function ExampleFormOverview(props: ExampleOverviewProps) {

  if (!props.value.missionId) {
    return (
      <EmptyState>
        <Title size="lg">You need to select a Example</Title>
        <EmptyStateBody>
          You will be able to have an entire application running in a few seconds...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select an Example</Button>
      </EmptyState>
    );
  }
  return (
    <ExamplesLoader query={{missionId: props.value.missionId, runtimeId: props.value.runtimeId}}>
      {result => (
        <OverviewComplete title={`Your example will be ${(result.catalog as any).name} using:`}>
          <img src={(result.catalog as any).runtime[0].icon} style={{margin: '5px auto', height: '160px'}}/>
        </OverviewComplete>
      )}
    </ExamplesLoader>
  );
}
