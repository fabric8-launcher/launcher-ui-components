import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { OpenshiftClusterLoader } from '../loaders/openshiftcluster-loader';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { DeploymentFormValue } from './deployment-form';

interface DeploymentFormProps {
  value: DeploymentFormValue;
  onClick: () => void;
}

export function DeploymentFormOverview(props: DeploymentFormProps) {

  if (!props.value.cluster.clusterId) {
    return (
      <EmptyState>
        <Title size="lg">You need to configure the OpenShift deployment</Title>
        <EmptyStateBody>
          You are going to choose where your application will be build, deployed and served.
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Configure OpenShift Deployment</Button>
      </EmptyState>
    );
  }
  return (
    <OpenshiftClusterLoader clusterId={props.value.cluster.clusterId}>
      {result => (
        <EmptyState>
          <Title size="lg"><CheckCircleIcon />OpenShift Deployment is configured</Title>
          <EmptyStateBody>
            You application will be deployed on the '{result!.name}' OpenShift cluster.
          </EmptyStateBody>
        </EmptyState>
      )}
    </OpenshiftClusterLoader>
  );
}
