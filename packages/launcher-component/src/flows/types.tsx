import { BackendFormValue } from '../hubs/backend-hub';
import { FrontendFormValue } from '../hubs/frontend-hub';
import { DestRepositoryFormValue } from '../hubs/dest-repository-hub';
import { DeploymentFormValue } from '../hubs/deployment-hub';
import { ExampleFormValue } from '../hubs/example-hub';
import { SrcRepositoryFormValue } from '../hubs/src-repository-hub';

export interface NewApp {
  backend: BackendFormValue;
  frontend: FrontendFormValue;
  destRepository: DestRepositoryFormValue;
  deployment: DeploymentFormValue;
}

export interface ExampleApp {
  example: ExampleFormValue;
  destRepository: DestRepositoryFormValue;
  deployment: DeploymentFormValue;
}

export interface ImportApp {
  srcRepository: SrcRepositoryFormValue;
  deployment: DeploymentFormValue;
}
