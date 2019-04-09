import { Grid, GridItem } from '@patternfly/react-core';
import * as React from 'react';
import { ExternalLink } from '../../../shared/components/ExternalLink';
import HttpRequest from '../../../shared/components/HttpRequest';
import RequestConsole, { RequestResult } from '../../../shared/components/RequestConsole';
import { RequestTitle } from '../../../shared/components/RequestTitle';
import CapabilityCard from '../../components/CapabilityCard';
import capabilitiesConfig from '../../config/capabilitiesConfig';
import { HealthChecksCapabilityApi, HEALTHCHECKS_LIVENESS_PATH, HEALTHCHECKS_READINESS_PATH } from './HealthChecksCapabilityApi';

interface HealthChecksCapabilityProps {
  apiService: HealthChecksCapabilityApi;
}

interface HealthChecksCapabilityState {
  results: RequestResult[];
}

export default class HealthChecksCapability extends React.Component<HealthChecksCapabilityProps, HealthChecksCapabilityState> {

  constructor(props: HealthChecksCapabilityProps) {
    super(props);

    this.state = {
      results: [],
    };
  }

  public render() {
    return (
      <CapabilityCard module="healthchecks">
        <CapabilityCard.Title>{capabilitiesConfig.healthchecks.icon} {capabilitiesConfig.healthchecks.name}</CapabilityCard.Title>
        <CapabilityCard.Body>
          <Grid>
            <GridItem span={12}>
              <p>
                Health checks are HTTP endpoints that the codebase exposes for the purpose of monitoring.
                OpenShift will periodically hit these to determine that the container is functioning properly.
                If not, it may kill and/or restart the pod to maintain the targeted number of instances configured to be running.
              </p>
              <p>Your application has been set up with the following Health Checks.</p>
              <p>
                <ExternalLink
                  href="https://docs.openshift.com/container-platform/latest/dev_guide/application_health.html"
                >
                  Learn more
                </ExternalLink>
              </p>
            </GridItem>
            <CapabilityCard.Separator/>
            <GridItem span={12} className="http-request-service">
              <RequestTitle>Liveness</RequestTitle>
            </GridItem>
            <HttpRequest
              name="Liveness check"
              method="GET"
              path={HEALTHCHECKS_LIVENESS_PATH}
              curlCommand={`curl -X GET '${this.props.apiService.getLivenessAbsoluteUrl()}'`}
              onExecute={this.execGetLiveness}
            />
            <GridItem span={12} className="http-request-service">
              <RequestTitle>Readiness</RequestTitle>
            </GridItem>
            <HttpRequest
              name="Readiness check"
              method="GET"
              path={HEALTHCHECKS_READINESS_PATH}
              curlCommand={`curl -X GET '${this.props.apiService.getReadinessAbsoluteUrl()}'`}
              onExecute={this.execGetReadiness}
            />
            <GridItem span={12}>
              <RequestConsole name="HealthChecks" results={this.state.results}/>
            </GridItem>
          </Grid>
        </CapabilityCard.Body>
      </CapabilityCard>
    );
  }

  private execGetLiveness = async () => {
    try {
      const result = await this.props.apiService.doGetLiveness();
      this.addResult(this.props.apiService.getLivenessAbsoluteUrl(), result);
    } catch (e) {
      this.addResult(this.props.apiService.getLivenessAbsoluteUrl(), {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  private execGetReadiness = async () => {
    try {
      const result = await this.props.apiService.doGetReadiness();
      this.addResult(this.props.apiService.getReadinessAbsoluteUrl(), result);
    } catch (e) {
      this.addResult(this.props.apiService.getReadinessAbsoluteUrl(), {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  private addResult(url: string, payload: { content?: any, time: number, error?: string }) {
    this.setState({
      results: [...this.state.results, {
        method: 'GET',
        ...payload,
        url,
      }],
    });
  }
}
