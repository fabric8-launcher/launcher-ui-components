import * as React from 'react';
import { DescriptiveHeader } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import { ClusterPicker, ClusterPickerValue } from '../pickers/cluster-picker/cluster-picker';
import { OpenshiftClustersLoader } from '../loaders/openshiftcluster-loader';
import { useAuthApi } from 'keycloak-react';

export interface DeploymentFormValue {
  cluster: ClusterPickerValue;
}

export const defaultDeploymentFormValue = { cluster: {}};

export function isDeploymentFormValueValid(value: DeploymentFormValue) {
  return !!value.cluster.clusterId;
}

interface DeploymentFormProps {
  value: DeploymentFormValue;

  onSave?(value: DeploymentFormValue);

  onCancel?();
}

export function DeploymentForm(props: DeploymentFormProps) {
  const authApi = useAuthApi();
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isDeploymentFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              description="Choose an OpenShift cluster to build,
               deploy and serve your application automatically on each push to your repository’s master branch."
            />
            <OpenshiftClustersLoader>
              {(clusters) => (
                <ClusterPicker
                  clusters={clusters}
                  value={inputProps.value.cluster}
                  onChange={(cluster) => inputProps.onChange({...inputProps.value, cluster})}
                  authorizationLinkGenerator={(clusterId) => authApi.user ? authApi.generateAuthorizationLink(clusterId) : ''}
                />
              )}
            </OpenshiftClustersLoader>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
