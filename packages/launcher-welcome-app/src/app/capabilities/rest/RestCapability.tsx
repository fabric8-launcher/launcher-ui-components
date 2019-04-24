import { Grid, GridItem, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import HttpRequest from '../../../shared/components/HttpRequest';
import { RequestConsoleEntry, useConsoleState, RequestConsole } from '../../../shared/components/RequestConsole';
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

export function RestCapability(props: RestCapabilityProps) {
  const [results, addResult] = useConsoleState();
  const [name, setName] = React.useState<string>('');

  const url = props.apiService.getGreetingAbsoluteUrl(name);
  const execGet = async () => {
    try {
      const result = await props.apiService.doGetGreeting(name);
      addResult('GET', url, result);
    } catch (e) {
      addResult('GET', url, {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };
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
          <CapabilityCard.Separator />
          <GridItem span={12} className="http-request-service">
            <RequestTitle>
              <SourceMappingLink
                sourceRepository={props.sourceRepository}
                name="greetingEndpoint"
                fileRepositoryLocation={props.extra.sourceMapping.greetingEndpoint}
              />
            </RequestTitle>
          </GridItem>
          <HttpRequest
            name="GET Greetings"
            method="GET"
            path={`${REST_GREETING_PATH}?name=`}
            curlCommand={`curl -X GET '${url}'`}
            onExecute={execGet}
          >
            <TextInput
              id="http-api-param-name-input"
              aria-label="Greetings name input"
              value={name}
              onChange={setName}
              name="name"
              placeholder="World"
              className="http-request-param"
            />
          </HttpRequest>
          <GridItem span={12}>
            <RequestConsole name="REST" results={results} />
          </GridItem>
        </Grid>
      </CapabilityCard.Body>
    </CapabilityCard>
  );
}
