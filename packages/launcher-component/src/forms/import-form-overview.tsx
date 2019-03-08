import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { ImportFormValue, isImportFormValueValid } from './import-form';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { SpecialValue } from '../core/stuff';

interface ImportOverviewProps {
  value: ImportFormValue;
  onClick: () => void;
}

export function ImportFormOverview(props: ImportOverviewProps) {

  if (!isImportFormValueValid(props.value)) {
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
    <OverviewComplete title="Import is configured">
      We will import the git repository <SpecialValue>{props.value.sourceGit.url}</SpecialValue>&nbsp;
      using <SpecialValue>{props.value.buildImage.imageName!}</SpecialValue> builder image
    </OverviewComplete>
  );
}
