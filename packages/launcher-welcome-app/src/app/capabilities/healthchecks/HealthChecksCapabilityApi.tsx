import { HttpApi } from '../../../shared/utils/HttpApi';
import { ApiFactoryFunction } from '../connectCapability';
import * as faker from 'faker';

export interface HealthChecksCapabilityApi {
  getLivenessAbsoluteUrl(): string;

  getReadinessAbsoluteUrl(): string;

  doGetLiveness(): Promise<{ content: string, time: number }>;

  doGetReadiness(): Promise<{ content: string, time: number }>;
}

export const HEALTHCHECKS_LIVENESS_PATH = '/health';
export const HEALTHCHECKS_READINESS_PATH = '/health';

class HttpHealthChecksCapabilityApi implements HealthChecksCapabilityApi {
  constructor(private readonly httpApi: HttpApi) {
  }

  public getLivenessAbsoluteUrl(): string {
    return this.httpApi.getAbsoluteUrl(HEALTHCHECKS_LIVENESS_PATH);
  }

  public async doGetLiveness(): Promise<{ content: string, time: number }> {
    const r = await this.httpApi.get<string>(HEALTHCHECKS_LIVENESS_PATH);
    return ({content: r, time: Date.now()});
  }

  public getReadinessAbsoluteUrl(): string {
    return this.httpApi.getAbsoluteUrl(HEALTHCHECKS_READINESS_PATH);
  }

  public async doGetReadiness(): Promise<{ content: string, time: number }> {
    const r = await this.httpApi.get<string>(HEALTHCHECKS_READINESS_PATH);
    return ({content: r, time: Date.now()});
  }
}

export class MockHealthChecksCapabilityApi implements HealthChecksCapabilityApi {
  public getLivenessAbsoluteUrl(): string {
    return 'http://mocked.io/liveness';
  }

  public async doGetLiveness(): Promise<{ content: string, time: number }> {
    return ({content: faker.random.boolean() ? 'OK' : 'NOK', time: Date.now()});
  }

  public getReadinessAbsoluteUrl(): string {
    return 'http://mocked.io/readiness';
  }

  public async doGetReadiness(): Promise<{ content: string, time: number }> {
    return ({content: faker.random.boolean() ? 'OK' : 'NOK', time: Date.now()});
  }
}

export const healthChecksCapabilityApiFactory: ApiFactoryFunction<HealthChecksCapabilityApi> = ({httpApi, isMockMode}) =>
  isMockMode ? new MockHealthChecksCapabilityApi() : new HttpHealthChecksCapabilityApi(httpApi);
