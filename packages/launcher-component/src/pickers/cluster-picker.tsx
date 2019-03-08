import React from 'react';
import {
  DataList,
  DataListItem,
  DataListCell,
  Radio,
  Title,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody
} from '@patternfly/react-core';
import { ServerIcon } from '@patternfly/react-icons';
import { OpenShiftCluster } from 'launcher-client';

import { InputProps } from '../core/types';

export interface ClusterPickerValue {
  clusterId?: string;
}

interface ClusterPickerProps extends InputProps<ClusterPickerValue> {
  clusters: OpenShiftCluster[];
  authorizationLinkGenerator: (id?: string) => string;
}

export function ClusterPicker(props: ClusterPickerProps) {
  if (props.clusters.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon icon={ServerIcon}/>
        <Title size="lg">No Active Clusters Found</Title>
        <EmptyStateBody>
          We couldn't find an active cluster associated to your account.
        </EmptyStateBody>
        <Button
          // @ts-ignore
          component="a"
          href={props.authorizationLinkGenerator()}
          target="_blank"
        >
          activate a cluster
        </Button>
      </EmptyState>
    );
  }
  return (
    <React.Fragment>
      <DataList aria-label="select-cluster">
        {
          props.clusters.map((cluster, i) => {
            const isSelected = props.value.clusterId === cluster.id;
            const onChangeSelected = () => {
              if (cluster.connected) {
                props.onChange({clusterId: cluster.id});
              }
            };

            if (!props.value.clusterId) {
              const connectedClusters = props.clusters.filter(c => c.connected);
              if (connectedClusters.length >= 1) {
                props.onChange({clusterId: connectedClusters[0].id});
              }
            }
            return (
              <DataListItem
                isExpanded={false}
                aria-labelledby={cluster.name}
                value={cluster.id}
                key={i}
                style={cluster.connected ? {cursor: 'pointer'} : {cursor: 'not-allowed'}}
              >
                <DataListCell width={1} style={{flex: 'none'}}>
                  <Radio
                    aria-label={`Choose ${cluster.name} as cluster`}
                    value={cluster.id}
                    checked={isSelected}
                    onChange={onChangeSelected}
                    name="cluster"
                    isDisabled={!cluster.connected}
                    id={`radio-choose-${cluster.id}-as-cluster`}
                  />
                </DataListCell>
                <DataListCell
                  width={1}
                  onClick={onChangeSelected}
                  style={{flex: 'none'}}
                >
                  <ServerIcon/>
                </DataListCell>
                <DataListCell width={3} onClick={onChangeSelected}>
                  <Title size="md" style={!cluster.connected ? {color: '#ccc'} : {}}>{cluster.name}</Title>
                </DataListCell>
                {!cluster.connected && (
                  <DataListCell width={1}>
                    <Button
                      // @ts-ignore
                      component="a"
                      href={props.authorizationLinkGenerator(cluster.id)}
                      target="_blank"
                    >
                      Authorize
                    </Button>
                  </DataListCell>
                )}
              </DataListItem>
            );
          })
        }
      </DataList>
    </React.Fragment>
  );
}
