import { Grid, GridItem, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import HttpRequest from '../../../shared/components/HttpRequest';
import { addResultFn, RequestConsole, useConsoleState } from '../../../shared/components/RequestConsole';
import { RequestTitle } from '../../../shared/components/RequestTitle';
import { SourceMappingLink } from '../../../shared/components/SourceMappingLink';
import { defaultIfEmpty } from '../../../shared/utils/Strings';
import CapabilityCard from '../../components/CapabilityCard';
import capabilitiesConfig from '../../config/capabilitiesConfig';
import { DatabaseCapabilityApi, DATABASE_FRUIT_PATH } from './DatabaseCapabilityApi';

interface DatabaseCapabilityProps {
  databaseType: string;
  apiService: DatabaseCapabilityApi;
  sourceRepository?: {
    url: string;
    provider: string;
  };
  extra: {
    sourceMapping: {
      dbEndpoint: string;
    };
  };
}

function GetFruits(props: { service: DatabaseCapabilityApi, addResult: addResultFn }) {
  const url = props.service.getFruitsAbsoluteUrl();
  const execFetchFruits = async () => {
    try {
      const result = await props.service.doFetchFruits();
      props.addResult('GET', url, result);
    } catch (e) {
      props.addResult('GET', url, {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  return (
    <HttpRequest
      method="GET"
      name="GET Fruit"
      path={DATABASE_FRUIT_PATH}
      curlCommand={`curl -X GET '${url}'`}
      onExecute={execFetchFruits}
    />
  );
}

function PostFruit(props: { service: DatabaseCapabilityApi, addResult: addResultFn }) {
  const [name, setName] = React.useState<string>('');
  const [stock, setStock] = React.useState<string>('');

  const fruitData = {
    name: defaultIfEmpty(name, 'Coco'),
    stock: Number(defaultIfEmpty(stock, '10')),
  };

  const url = props.service.getFruitsAbsoluteUrl();

  const curlCommand = `curl -X POST '${url}' `
    + `--header 'Content-Type: application/json' `
    + `--data '${JSON.stringify(fruitData)}'`;

  const execPostFruit = async () => {
    try {
      const result = await props.service.doPostFruit(fruitData);
      props.addResult('POST', url, result);
    } catch (e) {
      props.addResult('POST', url, {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  return (
    <HttpRequest
      name="POST Fruit"
      method="POST"
      path={DATABASE_FRUIT_PATH}
      curlCommand={curlCommand}
      onExecute={execPostFruit}
    >
      <span style={{ marginLeft: '98px' }}>
        Name:
        <TextInput
          id="http-api-param-post-name-input"
          value={name}
          onChange={setName}
          name="postName"
          placeholder="Coco"
          className="http-request-param"
        />
      </span>
      <span style={{ marginLeft: '50px' }}>
        Stock:
        <TextInput
          id="http-api-param-post-stock-input"
          value={stock}
          onChange={setStock}
          name="postStock"
          placeholder="10"
          className="http-request-param"
        />
      </span>
    </HttpRequest>
  );
}

function PutFruit(props: { service: DatabaseCapabilityApi, addResult: addResultFn }) {
  const [id, setId] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [stock, setStock] = React.useState<string>('');

  const fruitId = Number(defaultIfEmpty(id, '2'));
  const fruitData = {
    name: defaultIfEmpty(name, 'Banana'),
    stock: Number(defaultIfEmpty(stock, '10')),
  };

  const url = `${props.service.getFruitsAbsoluteUrl()}/${fruitId}`;

  const curlCommand = `curl -X PUT '${url}' `
    + `--header 'Content-Type: application/json' `
    + `--data '${JSON.stringify(fruitData)}'`;

  const execPutFruit = async () => {
    try {
      const result = await props.service.doPutFruit(fruitId, fruitData);
      props.addResult('PUT', url, result);
    } catch (e) {
      props.addResult('PUT', url, {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  return (
    <HttpRequest
      name="PUT Fruit"
      method="PUT"
      path={`${DATABASE_FRUIT_PATH}/`}
      curlCommand={curlCommand}
      onExecute={execPutFruit}
    >
      <TextInput
        id="http-api-param-put-id-input"
        value={id}
        onChange={setId}
        name="putId"
        placeholder="2"
        className="http-request-param"
        style={{ width: '40px' }}
      />
      <span style={{ marginLeft: '50px' }}>
        Name:
        <TextInput
          id="http-api-param-put-name-input"
          value={name}
          onChange={setName}
          name="putName"
          placeholder="Banana"
          className="http-request-param"
        />
      </span>
      <span style={{ marginLeft: '50px' }}>
        Stock:
        <TextInput
          id="http-api-param-put-stock-input"
          value={stock}
          onChange={setStock}
          name="putStock"
          placeholder="10"
          className="http-request-param"
        />
      </span>
    </HttpRequest>
  );
}

function DeleteFruit(props: { service: DatabaseCapabilityApi, addResult: addResultFn }) {
  const [id, setId] = React.useState<string>('');

  const fruitId = Number(defaultIfEmpty(id, '2'));
  const url = `${props.service.getFruitsAbsoluteUrl()}/${fruitId}`;
  const curlCommand = `curl -X DELETE '${url}' `;
  const execDeleteFruit = async () => {
    try {
      const result = await props.service.doDeleteFruit(fruitId);
      props.addResult('DELETE', url, { ...result, content: 'true' });
    } catch (e) {
      props.addResult('DELETE', url, {
        time: Date.now(),
        error: 'An error occured while executing the request',
      });
    }
  };

  return (
    <HttpRequest
      name="DELETE Fruit"
      method="DELETE"
      path={`${DATABASE_FRUIT_PATH}/`}
      curlCommand={curlCommand}
      onExecute={execDeleteFruit}
    >
      <TextInput
        id="http-api-param-delete-id-input"
        value={id}
        onChange={setId}
        name="deleteId"
        placeholder="2"
        className="http-request-param"
        style={{ width: '40px' }}
      />
    </HttpRequest>
  );
}

export function DatabaseCapability(props: DatabaseCapabilityProps) {
  const [results, addResult] = useConsoleState();
  return (
    <CapabilityCard module="database">
      <CapabilityCard.Title>{capabilitiesConfig.database.icon} {capabilitiesConfig.database.name}</CapabilityCard.Title>
      <CapabilityCard.Body>
        <Grid>
          <GridItem span={12}>
            As a starting point for your development,
            we have created a table and populated it with some data.
            We've additionally exposed CRUD operations via the following endpoints to give you a system that works end to end.
            </GridItem>
          <CapabilityCard.Separator />
          <GridItem span={12} className="http-request-service">
            <RequestTitle>
              <SourceMappingLink
                sourceRepository={props.sourceRepository}
                name="dbEndpoint"
                fileRepositoryLocation={props.extra.sourceMapping.dbEndpoint}
              />
            </RequestTitle>
          </GridItem>
          <GetFruits service={props.apiService} addResult={addResult} />
          <PostFruit service={props.apiService} addResult={addResult} />
          <PutFruit service={props.apiService} addResult={addResult} />
          <DeleteFruit service={props.apiService} addResult={addResult} />
          <GridItem span={12}>
            <RequestConsole name="Database" results={results} />
          </GridItem>
          <CapabilityCard.Separator />
        </Grid>
      </CapabilityCard.Body>
    </CapabilityCard>
  );
}
