import { Grid, GridItem, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import HttpRequest from '../../../shared/components/HttpRequest';
import RequestConsole, { RequestResult } from '../../../shared/components/RequestConsole';
import { RequestTitle } from '../../../shared/components/RequestTitle';
import { SourceMappingLink } from '../../../shared/components/SourceMappingLink';
import CapabilityCard from '../../components/CapabilityCard';
import capabilitiesConfig from '../../config/capabilitiesConfig';
import { RestCapabilityApi, REST_GREETING_PATH } from './RestCapabilityApi';

interface RestCapabilityProps {
  apiService: RestCapabilityApi;
  sourceRepository?: {
    url: string;
    provider: string;
  };
  extra: {
    sourceMapping: {
      greetingEndpoint: string;
    };
  };
}

interface RestCapabilityState {
  results: RequestResult[];
  params: {
    [name: string]: string;
  };
}

export default class RestCapability extends React.Component<RestCapabilityProps, RestCapabilityState> {

  constructor(props: RestCapabilityProps) {
    super(props);

    this.state = {
      results: [],
      params: {
        name: '',
      },
    };
  }

  public render() {
    return (
      <CapabilityCard module="rest">
        <CapabilityCard.Title>{capabilitiesConfig.rest.icon} {capabilitiesConfig.rest.name}</CapabilityCard.Title>
        <CapabilityCard.Body>
          <Grid>
            <GridItem span={12}>
              HTTP API endpoints expose your application to outside callers.
              Through these, programs may communicate over the network in a language-independent fashion.
              We have created an initial set of endpoints to illustrate how you may accomplish this in your selected runtime.
              By composing together HTTP endpoints and making use of hypermedia and links,
              you may follow these patterns to construct a RESTful architecture.
            </GridItem>
            <CapabilityCard.Separator/>
            <GridItem span={12} className="http-request-service">
              <RequestTitle>
                <SourceMappingLink
                  sourceRepository={this.props.sourceRepository}
                  name="greetingEndpoint"
                  fileRepositoryLocation={this.props.extra.sourceMapping.greetingEndpoint}
                />
              </RequestTitle>
            </GridItem>
            <HttpRequest
              name="GET Greetings"
              method="GET"
              path={`${REST_GREETING_PATH}?name=`}
              curlCommand={`curl -X GET '${this.getGreetingsUrl()}'`}
              onExecute={this.execGet}
            >
              <TextInput
                id="http-api-param-name-input"
                aria-label="Greetings name input"
                value={this.state.params.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="World"
                className="http-request-param"
              />
            </HttpRequest>
            <GridItem span={12}>
              <RequestConsole name="REST" results={this.state.results}/>
            </GridItem>
          </Grid>
        </CapabilityCard.Body>
      </CapabilityCard>
    );
  }

  private execGet = async () => {
    try {
      const result = await this.props.apiService.doGetGreeting(this.state.params.name);
      this.addResult(result);
    } catch (e) {
      this.addResult({
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  private handleInputChange = (_: any, event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      }
    });
  };

  private addResult(payload: { content?: string, time: number, error?: string }) {
    const url = this.getGreetingsUrl();
    this.setState({
      results: [...this.state.results, {
        method: 'GET',
        ...payload,
        url,
      }],
    });
  }

  private getGreetingsUrl() {
    return this.props.apiService.getGreetingAbsoluteUrl(this.state.params.name);
  }
}
