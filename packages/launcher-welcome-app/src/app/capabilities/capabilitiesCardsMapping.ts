import RestCapability from './rest/RestCapability';
import connectCapability from './connectCapability';
import { restCapabilityApiFactory } from './rest/RestCapabilityApi';
import DatabaseCapability from './database/DatabaseCapability';
import { databaseCapabilityApiFactory } from './database/DatabaseCapabilityApi';
import HealthChecksCapability from './healthchecks/HealthChecksCapability';
import { healthChecksCapabilityApiFactory } from './healthchecks/HealthChecksCapabilityApi';
import * as React from 'react';

const capabilitiesCardsMapping = {
  healthchecks: connectCapability(HealthChecksCapability, healthChecksCapabilityApiFactory),
  rest: connectCapability(RestCapability, restCapabilityApiFactory),
  database: connectCapability(DatabaseCapability, databaseCapabilityApiFactory),
} as { [module: string]: React.ElementType<any>};

export default capabilitiesCardsMapping;
