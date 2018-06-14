import { Location } from "@angular/common";
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs";
import { HelperService, TokenProvider, Cluster } from "ngx-forge";

export class HttpService {
  constructor(
    private http: Http,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) { }

  httpGet<T>(...endpoint: string[]): Observable<T> {
    endpoint.unshift(this.helperService.getBackendUrl());
    return this.options().flatMap((option) => {
      const url = this.joinPath(endpoint);
      return this.http.get(url, option)
        .map(response => response.json() as T)
        .catch(this.handleError);
    });
  }

  protected joinPath(parts: string[]): string {
    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
      result = Location.joinWithSlash(result, parts[i]);
    }
    return result;
  }

  protected options(cluster?: Cluster): Observable<RequestOptions> {
    let headers = new Headers();
    headers.append('X-App', this.helperService.getOrigin());
    headers.append('X-Git-Provider', 'GitHub');
    headers.append('X-Execution-Step-Index', '0');
    if (cluster) {
      headers.append('X-OpenShift-Cluster', cluster.id);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    return Observable.fromPromise(this.tokenProvider.token.then((token) => {
      headers.append('Authorization', 'Bearer ' + token);
      return new RequestOptions({
        headers: headers
      });
    }));
  }

  protected handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}