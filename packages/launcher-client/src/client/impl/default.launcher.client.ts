import { Locations } from '../helpers/locations';
import { filter } from '../helpers/launchers';
import { LauncherClient } from '../launcher.client';
import {
  AnalyzeResult,
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

  public authorizationToken?: string;

  constructor(private readonly httpService: HttpService, private readonly config: LauncherClientConfig) {
  }

  public async exampleCatalog(): Promise<Catalog> {
    return await this.httpService.get<Catalog>(this.config.launcherURL, '/booster-catalog');
  }

  public async findExampleApps(query: Example | ExampleMission | ExampleRuntime | ExampleRuntime):
    Promise<Example[] | ExampleMission[] | ExampleRuntime[] | ExampleRuntime[]> {
    return filter(query, await this.exampleCatalog());
  }

  public async capabilities(): Promise<Capability[]> {
    return await this.httpService.get<Capability[]>(this.config.creatorUrl, '/capabilities', this.getRequestConfig());
  }

  public async enum(id: string): Promise<PropertyValue[]> {
    return await this.httpService.get<PropertyValue[]>(this.config.creatorUrl, '/enums');
  }

  public async enums(): Promise<Enums> {
    return await this.httpService.get<Enums>(this.config.creatorUrl, '/enums');
  }

  public async importAnalyze(gitImportUrl: string): Promise<AnalyzeResult> {
    const endpoint = '/import/analyze?gitImportUrl' + encodeURIComponent(gitImportUrl);
    return await this.httpService.get<AnalyzeResult>(this.config.creatorUrl, endpoint);
  }

  public async download(payload: DownloadAppPayload): Promise<DownloadAppResult> {
    if (payload.parts.length === 1 && payload.parts[0].shared.mission) {
      // TODO example app download (build link)
      throw new Error('Download is not implemented yet for example app');
    }
    const r = await this.httpService.post<DownloadAppPayload, { id: string }>(
      this.config.creatorUrl, '/zip',
      payload,
      this.getRequestConfig()
    );
    return ({
      downloadLink: `${this.config.launcherURL}/download?id=${r.id}`
    });
  }

  public async launch(payload: LaunchAppPayload): Promise<LaunchAppResult> {
    let endpoint: string;
    let p: any = payload;
    if (payload.parts.length === 1 && payload.parts[0].shared.mission) {
      endpoint = this.config.launcherURL;
      p = ExampleAppDescriptor.toExampleAppDescriptor(payload);
    } else {
      endpoint = this.config.creatorUrl;
    }
    const r = await this.httpService.post<any, { uuid_link: string, event: [] }>(
      endpoint, '/launch', p, this.getRequestConfig()
    );
    return {
      id: r.uuid_link,
      events: r.event
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
    return await this.httpService.head<ExistsResult>(this.config.launcherURL,
      `/services/git/repositories/${payload.repositoryName}`,
      this.getRequestConfig({ gitProvider: payload.gitProvider })
    );
  }

  public async gitInfo(): Promise<GitInfo> {
    return await this.httpService.get<GitInfo>(this.config.launcherURL, '/services/git/user', this.getRequestConfig());
  }

  public async ocClusters(): Promise<OpenShiftCluster[]> {
    const r = await this.httpService.get<any>(this.config.launcherURL, '/services/openshift/clusters', this.getRequestConfig());
    return r.map(c => ({
      ...c.cluster, connected: c.connected
    }));
  }

  public async ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult> {
    return await this.httpService.head<ExistsResult>(this.config.launcherURL,
      `/services/openshift/projects/${payload.projectName}`,
      this.getRequestConfig({ clusterId: payload.clusterId })
    );
  }

  private getRequestConfig(config: { gitProvider?: string, executionIndex?: number, clusterId?: string } = {}): RequestConfig {
    const headers = {};
    if (config.gitProvider) {
      headers['X-Git-Provider'] = config.gitProvider;
    }
    if (this.authorizationToken) {
      headers['Authorization'] = `Bearer ${this.authorizationToken}`;
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
