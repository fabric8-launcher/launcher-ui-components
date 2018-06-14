import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs";

import { TokenService, HelperService, TokenProvider, Cluster } from 'ngx-forge';
import { KeycloakService } from '../../shared/keycloak.service';
import { HttpService } from './http.service';

class ConnectedCluster {
  connected: boolean;
  cluster: {
    id: string;
    name: string;
    type: string;
  };
}


@Injectable()
export class AppLauncherTokenService extends HttpService implements TokenService {

  private static API_BASE: string = '/services/openshift/clusters';

  constructor(
    private _http: Http,
    private _helperService: HelperService,
    private _tokenProvider: TokenProvider,
    private keycloak: KeycloakService
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  createOathLink(cluster: string): string {
    return this.keycloak.linkAccount(cluster, location.href);
  }

  get clusters(): Observable<Cluster[]> {
    const endPoint: string = this.joinPath([this._helperService.getBackendUrl(), AppLauncherTokenService.API_BASE]);
    return this.fetchClusters(endPoint);
  }

  private fetchClusters(endPoint: string, filter?: Function): Observable<Cluster[]> {
    return this.options().flatMap((option) => {
      return this._http.get(endPoint, option)
                  .map(response => filter ? filter(response.json()) : this.toClusters(response.json() as ConnectedCluster[]))
                  .catch(this.handleError);
    });
  }

  private toClusters(clusters: ConnectedCluster[]): Cluster[] {
    return clusters.map(c => {
      return {
        id: c.cluster.id,
        name: c.cluster.name,
        type: c.cluster.type,
        connected: c.connected
      } as Cluster;
    });
  }
}
