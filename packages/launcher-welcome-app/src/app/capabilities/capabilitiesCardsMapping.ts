import connectCapability from './connectCapability';
import { restCapabilityApiFactory } from './rest/RestCapabilityApi';
import { databaseCapabilityApiFactory } from './database/DatabaseCapabilityApi';
import { healthChecksCapabilityApiFactory } from './healthchecks/HealthChecksCapabilityApi';
import * as React from 'react';
import { HealthChecksCapability } from './healthchecks/HealthChecksCapability';
import { RestCapability } from './rest/RestCapability';
import { DatabaseCapability } from './database/DatabaseCapability';

const capabilitiesCardsMapping = {
  healthchecks: connectCapability(HealthChecksCapability, healthChecksCapabilityApiFactory),
  rest: connectCapability(RestCapability, restCapabilityApiFactory),
  database: connectCapability(DatabaseCapability, databaseCapabilityApiFactory),
} as { [module: string]: React.ElementType<any>};

export default capabilitiesCardsMapping;
