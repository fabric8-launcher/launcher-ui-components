import {
  AuthorizedRequest,
  Capability,
  DownloadAppPayload,
  DownloadAppResult, Enums,
  ExistsResult,
  GitInfo,
  GitRepositoryExistsPayload,
  LaunchAppPayload,
  LaunchAppResult,
  OCExistsProjectPayload,
  OpenShiftCluster, PropertyValue,
  StatusListener,
  Example,
  Catalog,
  ExampleMission,
  ExampleRuntime,
  AnalyzeResult,
  GitProvider,
  AuthorizationTokenProvider
} from './types';

export const defaultAuthorizationTokenProvider = async () => undefined;

export interface LauncherClient {
  authorizationTokenProvider: AuthorizationTokenProvider;

  exampleCatalog(): Promise<Catalog>;

  findExampleApps(query: Example | ExampleMission | ExampleRuntime | ExampleRuntime):
    Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]>;

  enum(id: string): Promise<PropertyValue[]>;

  enums(): Promise<Enums>;

  capabilities(): Promise<Capability[]>;

  importAnalyze(gitImportUrl: string): Promise<AnalyzeResult>;

  download(payload: DownloadAppPayload): Promise<DownloadAppResult>;

  launch(payload: LaunchAppPayload): Promise<LaunchAppResult>;

  follow(id: string, events: Array<{ name: string }>, listener: StatusListener);

  ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult>;

  ocClusters(): Promise<OpenShiftCluster[]>;

  gitProviders(): Promise<GitProvider[]>;

  gitRepositoryExists(payload: GitRepositoryExistsPayload): Promise<ExistsResult>;

  gitInfo(options: AuthorizedRequest): Promise<GitInfo>;
}
