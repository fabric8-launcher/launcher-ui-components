export interface LauncherClientConfig {
  launcherURL: string;
  creatorUrl: string;
}

export interface AppDescriptor {
  application: string;
  parts: Array<{
    subFolderName?: string;
    shared: {
      mission?: { id: string; version: string };
      runtime: { name: string; version: string; };
      nodejs?: { name: string; version: string; };
      maven?: { groupId: string; artifactId: string; version: string; };
    };
    capabilities?: Array<{ module: string; }>;
  }>;

}

export class ExampleAppDescriptor {
  public projectName: string;
  public projectVersion: string;
  public targetEnvironment: string;
  public clusterId: string;
  public mission: string;
  public runtime: string;
  public runtimeVersion: string;
  public gitRepository: string;
  public gitOrganization: string;

  constructor(payload: LaunchAppPayload) {
    this.projectName = payload.projectName;
    this.projectVersion = '1.0.0';
    this.targetEnvironment = 'os';
    this.clusterId = payload.clusterId;
    const part = payload.project.parts[0];
    this.mission = part.shared.mission!.id;
    this.runtime = part.shared.runtime.name;
    this.runtimeVersion = part.shared.runtime.version;
    this.gitRepository = payload.gitRepository;
    this.gitOrganization = payload.gitOrganization
  }

  public static toExampleAppDescriptor(payload: LaunchAppPayload): ExampleAppDescriptor {
    return new ExampleAppDescriptor(payload);
  }
}

interface GitRepository {
  gitOrganization: string;
  gitRepository: string;
}

interface OpenShiftClusterProject {
  clusterId: string;
  projectName: string;
}

interface ProjectDescriptor {
  project: AppDescriptor;
}

export type DownloadAppPayload = ProjectDescriptor;
export type LaunchAppPayload = ProjectDescriptor & GitRepository & OpenShiftClusterProject;

export interface StatusListener {
  onMessage(message: StatusMessage);

  onError(error: any);

  onComplete();
}

export interface StatusMessage {
  statusMessage: string;
  data?: {
    location?: string;
    error?: string;
  };
}

export interface PropertyValue {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  metadata?: any;
}

export interface OpenShiftCluster {
  connected: boolean;
  id: string;
  name: string;
  type: string;
}

export interface GitInfo {
  avatarUrl: string;
  login: string;
  organizations: string[];
  repositories: string[];
}

export interface FieldProperty {
  id: string;
  name: string;
  description: string;
  type: string;
  required: boolean;
  default?: string;
  props?: FieldProperty[];
  values?: PropertyValue[];
  shared?: boolean;
  enabledWhen?: {
    propId: string;
    equals: string[];
  };
}

export interface Capability {
  module: string;
  name: string;
  description: string;
  props: FieldProperty[];
  metadata: {
    category: string;
    icon: string;
  };
}

export interface Catalog {
  missions: ExampleMission[];
  runtimes: ExampleRuntime[];
  boosters: Example[];
}

export interface ExampleVersion {
  id: string;
  name: string;
  metadata?: any;
}

export interface ExampleRuntime {
  id: string;
  name: string;
  description?: string;
  metadata?: any;
  icon: string;
}

export interface ExampleMission {
  id: string;
  name: string;
  description?: string;
  metadata?: any;
  runtime?: ExampleRuntime[];
}

export interface Example {
  name: string;
  description?: string;
  metadata?: any;
  mission: ExampleMission | string;
  runtime: ExampleRuntime | string;
  version: ExampleVersion | string;
  source?: any;
}

export function toRuntime(arg: string) {
  const parts = arg.split('/', 2);
  return { name: parts[0], version: parts.length > 1 ? parts[1] : undefined };
}

export interface AuthorizedRequest {
  authorizationToken?: string;
}

export interface OCExistsProjectPayload {
  projectName: string;
  clusterId: string;
}

export interface GitRepositoryExistsPayload {
  repositoryName: string;
  gitProvider?: string;
}

export interface ExistsResult {
  exists: boolean;
}

export interface LaunchAppResult {
  id: string;
  events: Array<{ name: string, message: string }>;
}

export interface AnalyzeResult {
  image: string;
  builderImages: Array<{
    id: string;
    name: string;
    metadata: {
      language: string,
      isBuilder: boolean
    }
  }>;
}

export interface Enums {
  [id: string]: PropertyValue[];
}

export interface DownloadAppResult {
  downloadLink: string;
}

export type AuthorizationTokenProvider =  () => Promise<string | undefined>;
