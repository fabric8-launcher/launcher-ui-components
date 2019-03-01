import { Locations } from '../helpers/locations';
import { filter } from '../helpers/launchers';
import { defaultAuthorizationTokenProvider, LauncherClient } from '../launcher.client';
import {
  AnalyzeResult,
  AuthorizationTokenProvider,
  Capability,
  Catalog,
  DownloadAppPayload,
  DownloadAppResult,
  Enums,
  Example,
  ExampleAppDescriptor,
  ExampleMission,
  ExampleRuntime,
  ExistsResult,
  GitInfo,
  GitRepositoryExistsPayload,
  LaunchAppPayload,
  LaunchAppResult,
  LauncherClientConfig,
  OCExistsProjectPayload,
  OpenShiftCluster,
  PropertyValue,
  StatusListener,
  StatusMessage
} from '../types';
import { HttpService, RequestConfig } from '../http.service';

export default class DefaultLauncherClient implements LauncherClient {

  public authorizationTokenProvider: AuthorizationTokenProvider;

  constructor(private readonly httpService: HttpService, private readonly config: LauncherClientConfig) {
    this.authorizationTokenProvider = defaultAuthorizationTokenProvider;
  }

  public async exampleCatalog(): Promise<Catalog> {
    return await this.httpService.get<Catalog>(this.config.launcherURL, '/booster-catalog');
  }

  public async findExampleApps(query: Example | ExampleMission | ExampleRuntime | ExampleRuntime):
    Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]> {
    return filter(query, await this.exampleCatalog());
  }

  public async capabilities(): Promise<Capability[]> {
    const requestConfig = await this.getRequestConfig();
    return await this.httpService.get<Capability[]>(this.config.creatorUrl, '/capabilities', requestConfig);
  }

  public async enum(id: string): Promise<PropertyValue[]> {
    const enums = await this.httpService.get<PropertyValue[]>(this.config.creatorUrl, '/enums');
    return enums[id] || [];
  }

  public async enums(): Promise<Enums> {
    return await this.httpService.get<Enums>(this.config.creatorUrl, '/enums');
  }

  public async importAnalyze(gitImportUrl: string): Promise<AnalyzeResult> {
    const endpoint = '/import/analyze?gitImportUrl' + encodeURIComponent(gitImportUrl);
    return await this.httpService.get<AnalyzeResult>(this.config.creatorUrl, endpoint);
  }

  public async download(payload: DownloadAppPayload): Promise<DownloadAppResult> {
    if (payload.project.parts.length === 1 && payload.project.parts[0].shared.mission) {
      // TODO example app download (build link)
      throw new Error('Download is not implemented yet for example app');
    }
    const requestConfig = await this.getRequestConfig();
    const r = await this.httpService.post<DownloadAppPayload, { id: string }>(
      this.config.creatorUrl, '/zip',
      payload,
      requestConfig
    );
    return ({
      downloadLink: `${this.config.launcherURL}/download?id=${r.id}`
    });
  }

  public async launch(payload: LaunchAppPayload): Promise<LaunchAppResult> {
    let endpoint = this.config.creatorUrl;
    let p: any = payload;

    if (payload.project.parts.length === 1 && payload.project.parts[0].shared.mission) {
      endpoint = Locations.joinPath(this.config.launcherURL, '/launcher');
      p = ExampleAppDescriptor.toExampleAppDescriptor(payload);
    }

    const requestConfig = await this.getRequestConfig({ clusterId: payload.clusterId });
    const r = await this.httpService.post<any, { uuid_link: string, events: [] }>(
      endpoint, '/launch', p, requestConfig
    );
    return {
      id: r.uuid_link,
      events: r.events
    };
  }

  public follow(id: string, events: Array<{ name: string }>, listener: StatusListener) {
    const socket = new WebSocket(Locations.createWebsocketUrl(this.config.launcherURL) + id);
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data) as StatusMessage;
      if (message.data && message.data.error) {
        listener.onError(new Error(message.data.error));
        socket.close();
      } else {
        listener.onMessage(message);
        if (message.statusMessage === events[events.length - 1].name) {
          listener.onComplete();
          socket.close();
        }
      }
    };
    socket.onerror = listener.onError;
    socket.onclose = listener.onComplete;
  }

  public async gitRepositoryExists(payload: GitRepositoryExistsPayload): Promise<ExistsResult> {
    const requestConfig = await this.getRequestConfig();
    return await this.httpService.head<ExistsResult>(this.config.launcherURL,
      `/services/git/repositories/${payload.repositoryName}`, requestConfig);
  }

  public async gitInfo(): Promise<GitInfo> {
    const requestConfig = await this.getRequestConfig();
    return await this.httpService.get<GitInfo>(this.config.launcherURL, '/services/git/user', requestConfig);
  }

  public async ocClusters(): Promise<OpenShiftCluster[]> {
    const requestConfig = await this.getRequestConfig();
    const r = await this.httpService.get<any>(this.config.launcherURL, '/services/openshift/clusters', requestConfig);
    return r.map(c => ({
      ...c.cluster, connected: c.connected
    }));
  }

  public async ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult> {
    const requestConfig = await this.getRequestConfig();
    return await this.httpService.head<ExistsResult>(this.config.launcherURL,
      `/services/openshift/projects/${payload.projectName}`,
      requestConfig
    );
  }

  private async getRequestConfig(config: { gitProvider?: string, executionIndex?: number, clusterId?: string } = {})
    : Promise<RequestConfig> {
    const authorizationToken = await this.authorizationTokenProvider();
    const headers = {};
    if (config.gitProvider) {
      headers['X-Git-Provider'] = config.gitProvider;
    }
    if (authorizationToken) {
      headers['Authorization'] = `Bearer ${authorizationToken}`;
    }
    if (config.executionIndex) {
      headers['X-Execution-Step-Index'] = config.executionIndex;
    }
    if (config.clusterId) {
      headers['X-OpenShift-Cluster'] = config.clusterId;
    }
    return { headers };
  }

}
