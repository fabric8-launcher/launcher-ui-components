import { defaultAuthorizationTokenProvider, LauncherClient } from '../launcher.client';
import {
  AnalyzeResult, AnyExample,
  Capability,
  Catalog,
  DownloadAppPayload,
  DownloadAppResult,
  Enums,
  ExistsResult,
  GitInfo,
  GitProvider,
  GitRepositoryExistsPayload,
  LaunchAppPayload,
  LaunchAppResult,
  OCExistsProjectPayload,
  OpenShiftCluster,
  PropertyValue,
  StatusListener
} from '../types';

import capabilities from '../data-examples/mock-capabilities.json';
import enums from '../data-examples/mock-enums.json';
import clusters from '../data-examples/mock-clusters.json';
import gitUser from '../data-examples/mock-git-user.json';
import exampleCatalog from '../data-examples/mock-example-catalog.json';
import analyzeResult from '../data-examples/mock-import-analyze.json';
import gitProviders from '../data-examples/mock-git-providers.json';
import { filter } from '../..';

const progressDef = {
  success: [
    {
      statusMessage: 'GITHUB_CREATE',
      data: {
        location: 'https://github.com/fabric8-launcher/launcher-backend'
      }
    },
    {statusMessage: 'GITHUB_PUSHED'},
    {
      statusMessage: 'OPENSHIFT_CREATE'
    },
    {
      statusMessage: 'OPENSHIFT_CREATE',
      data: {
        location: 'https://console.starter-us-east-2.openshift.com/console/projects'
      }
    },
    {
      statusMessage: 'OPENSHIFT_PIPELINE', data: {
        routes: {
          welcome: 'http://welcome-gullible-rake.7e14.starter-us-west-2.openshiftapps.com/'
        }
      }
    },
    {statusMessage: 'GITHUB_WEBHOOK'},
  ],
};

export default class MockLauncherClient implements LauncherClient {

  public authorizationTokenProvider = defaultAuthorizationTokenProvider;

  constructor() {
  }

  public async exampleCatalog(): Promise<Catalog> {
    return exampleCatalog as Catalog;
  }

  public async findExampleApps(query: AnyExample): Promise<AnyExample[]> {
    return filter(query, await this.exampleCatalog());
  }

  public async capabilities(): Promise<Capability[]> {
    return capabilities;
  }

  public async enum(id: string): Promise<PropertyValue[]> {
    return enums[id];
  }

  public async enums(): Promise<Enums> {
    return enums;
  }

  public async importAnalyze(gitImportUrl: string): Promise<AnalyzeResult> {
    return analyzeResult;
  }

  public async download(payload: DownloadAppPayload): Promise<DownloadAppResult> {
    const output: DownloadAppResult = {
      downloadLink: `http://mock/result.zip`
    };
    return Promise.resolve(output)
      .then((d) => new Promise<DownloadAppResult>(resolve => setTimeout(() => resolve(d), 1000)));
  }

  public async launch(payload: LaunchAppPayload): Promise<LaunchAppResult> {
    console.info(`calling launch with projectile: ${JSON.stringify(payload)}`);
    const output: LaunchAppResult = {
      id: `success`,
      events: [
        {name: 'GITHUB_CREATE', message: 'Creating your new GitHub repository'},
        {name: 'GITHUB_PUSHED', message: 'Pushing your customized Booster code into the repo'},
        {name: 'OPENSHIFT_CREATE', message: 'Creating your project on OpenShift Online'},
        {name: 'OPENSHIFT_PIPELINE', message: 'Setting up your build pipeline'},
        {name: 'GITHUB_WEBHOOK', message: 'Configuring to trigger builds on Git pushes'}
      ]
    };
    return Promise.resolve(output)
      .then((d) => new Promise<LaunchAppResult>(resolve => setTimeout(() => resolve(d), 1000)));
  }

  public follow(id: string, events: Array<{ name: string }>, listener: StatusListener) {
    const progress = progressDef[id];
    if (!progress) {
      throw new Error(`invalid id ${id}`);
    }
    let i = 0;
    const interval = setInterval(value => {
      if (i < progress.length) {
        listener.onMessage(progress[i++]);
      } else {
        clearInterval(interval);
        listener.onComplete();
      }
    }, 2500);
  }

  public async gitProviders(): Promise<GitProvider[]> {
    return gitProviders as GitProvider[];
  }

  public async gitRepositoryExists(payload: GitRepositoryExistsPayload): Promise<ExistsResult> {
    return {exists: false};
  }

  public async gitInfo(): Promise<GitInfo> {
    return gitUser;
  }

  public async ocClusters(): Promise<OpenShiftCluster[]> {
    return clusters.map(c => ({
      ...c.cluster, connected: c.connected
    }));
  }

  public async ocExistsProject(payload: OCExistsProjectPayload): Promise<ExistsResult> {
    return {exists: false};
  }

}
