import { LauncherClient } from '../launcher.client';
import { AnalyzeResult, Capability, Catalog, DownloadAppPayload, DownloadAppResult, Enums, Example, ExampleMission, ExampleRuntime, ExistsResult, GitInfo, GitRepositoryExistsPayload, LaunchAppPayload, LaunchAppResult, LauncherClientConfig, OCExistsProjectPayload, OpenShiftCluster, PropertyValue, StatusListener } from '../types';
import { HttpService } from '../http.service';
export default class DefaultLauncherClient implements LauncherClient {
    private readonly httpService;
    private readonly config;
    authorizationToken?: string;
    constructor(httpService: HttpService, config: LauncherClientConfig);
    exampleCatalog(): Promise<Catalog>;
    findExampleApps(query: Example | ExampleMission | ExampleRuntime | ExampleRuntime): Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]>;
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
    private getRequestConfig;
}
