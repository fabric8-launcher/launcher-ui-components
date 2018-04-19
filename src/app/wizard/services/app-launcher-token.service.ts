import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs";

import { TokenService, HelperService, TokenProvider, Cluster } from 'ngx-forge';
import { KeycloakService } from '../../shared/keycloak.service';

@Injectable()
export class AppLauncherTokenService implements TokenService {

  private END_POINT: string = '';
  private API_BASE: string = 'services/openshift/clusters';
  private ORIGIN: string = '';

  constructor(
    private http: Http,
    private helperService: HelperService,
    private tokenProvider: TokenProvider,
    private keycloak: KeycloakService
  ) {
    if (this.helperService) {
      this.END_POINT = this.helperService.getBackendUrl();
      this.ORIGIN = this.helperService.getOrigin();
    }
  }

  private get options(): Observable<RequestOptions> {
    let headers = new Headers();
    headers.append('X-App', this.ORIGIN);
    headers.append('X-Git-Provider', 'GitHub');
    headers.append('X-Execution-Step-Index', '0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return Observable.fromPromise(this.tokenProvider.token.then((token) => {
      headers.append('Authorization', 'Bearer ' + token);
      return new RequestOptions({
        headers: headers
      });
    }));
  }

  get availableClusters(): Observable<Cluster[]> {
    const endPoint: string = this.END_POINT + this.API_BASE;
    return this.fetchClusters(endPoint, this.filter);
  };

  private filter(response: any[]): Cluster[] {
    let result: Cluster[] = [];
    for (let element of response) {
      if (element.connected) {
        result.push(element.cluster);
      }
    }
    return result;
  }

  get clusters(): Observable<Cluster[]> {
    const endPoint: string = this.END_POINT + this.API_BASE + '/all';
    return this.fetchClusters(endPoint);
  }

  private fetchClusters(endPoint: string, filter?: Function): Observable<Cluster[]> {
    return this.options.flatMap((option) => {
      return this.http.get(endPoint, option)
                  .map(response => filter ? filter(response.json()) : response.json() as Cluster[])
                  .catch(this.handleError);
    });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  createOathLink(cluster: string): string {
    return this.keycloak.linkAccount(cluster, location.href);
  }
}
