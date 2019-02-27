import { AuthorizedRequest, Capability, DownloadAppPayload, DownloadAppResult, Enums, ExistsResult, GitInfo, GitRepositoryExistsPayload, LaunchAppPayload, LaunchAppResult, OCExistsProjectPayload, OpenShiftCluster, PropertyValue, StatusListener, Example, Catalog, ExampleMission, ExampleRuntime, AnalyzeResult } from './types';
export interface LauncherClient {
    authorizationToken?: string;
    exampleCatalog(): Promise<Catalog>;
    findExampleApps(query: Example | ExampleMission | ExampleRuntime | ExampleRuntime): Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]>;
    enum(id: string): Promise<PropertyValue[]>;
    enums(): Promise<Enums>;
    capabilities(): Promise<Capability[]>;
    importAnalyze(gitImportUrl: string): Promise<AnalyzeResult>;
    download(payload: DownloadAppPayload): Promise<DownloadAppResult>;
    launch(payload: LaunchAppPayload): Promise<LaunchAppResult>;
    follow(id: string, events: Array<{
        name: string;
    }>, listener: StatusListener): any;
    ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult>;
    ocClusters(): Promise<OpenShiftCluster[]>;
    gitRepositoryExists(payload: GitRepositoryExistsPayload): Promise<ExistsResult>;
    gitInfo(options: AuthorizedRequest): Promise<GitInfo>;
}
