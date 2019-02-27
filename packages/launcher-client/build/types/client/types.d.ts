export interface LauncherClientConfig {
    launcherURL: string;
    creatorUrl: string;
}
export interface AppDescriptor {
    name: string;
    parts: Array<{
        subFolderName?: string;
        shared: {
            mission?: {
                id: string;
                version: string;
            };
            runtime: {
                name: string;
                version: string;
            };
            nodejs?: {
                name: string;
                version: string;
            };
            maven?: {
                groupId: string;
                artifactId: string;
                version: string;
            };
        };
        capabilities?: Array<{
            module: string;
        }>;
    }>;
}
export declare class ExampleAppDescriptor {
    projectName: string;
    projectVersion: string;
    targetEnvironment: string;
    clusterId: string;
    mission: string;
    runtime: string;
    runtimeVersion: string;
    gitRepository: string;
    constructor(payload: LaunchAppPayload);
    static toExampleAppDescriptor(payload: LaunchAppPayload): ExampleAppDescriptor;
}
interface GitRepository {
    organization: string;
    repository: string;
}
interface OpenShiftClusterProject {
    clusterId: string;
    projectName: string;
}
export declare type DownloadAppPayload = AppDescriptor;
export declare type LaunchAppPayload = AppDescriptor & GitRepository & OpenShiftClusterProject;
export interface StatusListener {
    onMessage(message: StatusMessage): any;
    onError(error: any): any;
    onComplete(): any;
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
export declare function toRuntime(arg: string): {
    name: string;
    version: string | undefined;
};
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
    events: Array<{
        name: string;
        message: string;
    }>;
}
export interface AnalyzeResult {
    id: string;
    name: string;
    metadata: {
        language: string;
        isBuilder: boolean;
    };
}
export interface Enums {
    [id: string]: PropertyValue[];
}
export interface DownloadAppResult {
    downloadLink: string;
}
export {};
