import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { Cluster, HelperService, TokenProvider, TokenService } from 'ngx-forge';
import { KeycloakService } from '../../shared/keycloak.service';
import { HttpService } from './http.service';
import { catchError, map } from 'rxjs/operators';

class ConnectedCluster {
  public connected: boolean;
  public cluster: {
    id: string;
    name: string;
    type: string;
  };
}

@Injectable()
export class AppLauncherTokenService extends HttpService implements TokenService {

  private static API_BASE: string = '/services/openshift/clusters';

  constructor(
    private _http: HttpClient,
    private _helperService: HelperService,
    private _tokenProvider: TokenProvider,
    private keycloak: KeycloakService
  ) {
    super(_http, _helperService, _tokenProvider);
  }

  public createOathLink(cluster: string): string {
    return this.keycloak.linkAccount(cluster, location.href);
  }

  get clusters(): Observable<Cluster[]> {
    return this.fetchClusters();
  }

  private fetchClusters(): Observable<Cluster[]> {
    return this.fetchConnectedClusters().pipe(
      map((response) => this.toClusters(response)),
      catchError(HttpService.handleError)
    );
  }

  private fetchConnectedClusters(): Observable<ConnectedCluster[]> {
    return this.backendHttpGet(AppLauncherTokenService.API_BASE);
  }

  private toClusters(clusters: ConnectedCluster[]): Cluster[] {
    return clusters.map((c) => {
      return {
        id: c.cluster.id,
        name: c.cluster.name,
        type: c.cluster.type,
        connected: c.connected
      } as Cluster;
    });
  }
}
