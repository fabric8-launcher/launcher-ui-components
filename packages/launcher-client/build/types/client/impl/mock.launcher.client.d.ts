import { LauncherClient } from '../launcher.client';
import { AnalyzeResult, Capability, Catalog, DownloadAppPayload, DownloadAppResult, Enums, Example, ExampleMission, ExampleRuntime, ExistsResult, GitInfo, GitRepositoryExistsPayload, LaunchAppPayload, LaunchAppResult, OCExistsProjectPayload, OpenShiftCluster, PropertyValue, StatusListener } from '../types';
export default class MockLauncherClient implements LauncherClient {
    authorizationToken?: string;
    constructor();
    exampleCatalog(): Promise<Catalog>;
    findExampleApps(query: any): Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]>;
    capabilities(): Promise<Capability[]>;
    enum(id: string): Promise<PropertyValue[]>;
    enums(): Promise<Enums>;
    importAnalyze(gitImportUrl: string): Promise<AnalyzeResult>;
    download(payload: DownloadAppPayload): Promise<DownloadAppResult>;
    launch(payload: LaunchAppPayload): Promise<LaunchAppResult>;
    follow(id: string, events: Array<{
        name: string;
    }>, listener: StatusListener): void;
    gitRepositoryExists(payload: GitRepositoryExistsPayload): Promise<ExistsResult>;
    gitInfo(): Promise<GitInfo>;
    ocClusters(): Promise<OpenShiftCluster[]>;
    ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult>;
}
