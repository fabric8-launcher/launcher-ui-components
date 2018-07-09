import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cluster, HelperService, TokenProvider } from 'ngx-launcher';
import { catchError, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs-compat';
import { throwError } from 'rxjs';
import { fromPromise } from 'rxjs-compat/observable/fromPromise';

export class HttpService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private tokenProvider: TokenProvider
  ) {
  }

  public static handleError(error: HttpErrorResponse) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = `An error occurred: ${error.error.message}`;
    } else {
      errMsg = `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
    }
    return throwError(errMsg);
  }

  public backendHttpGet<T>(...endpoint: string[]): Observable<T> {
    endpoint.unshift(this.helperService.getBackendUrl());
    return this.options().pipe(
      flatMap((options) => this.http.get<T>(this.joinPath(...endpoint), options)),
      catchError(HttpService.handleError)
    );
  }

  protected joinPath(...parts: string[]): string {
    if (!parts || parts.length === 0) {
      return '';
    }
    let result = parts[0];
    for (const part of parts.slice(1)) {
      result = Location.joinWithSlash(result, part);
    }
    return result;
  }

  protected options(cluster?: Cluster, retry: number = 0): Observable<object> {
    let headers = new HttpHeaders()
      .append('X-App', this.helperService.getOrigin())
      .append('X-Git-Provider', 'GitHub')
      .append('X-Execution-Step-Index', String(retry));
    if (cluster) {
      headers = headers.append('X-OpenShift-Cluster', cluster.id);
    }
    return fromPromise(this.tokenProvider.token.then((token) => {
      return {
        headers: headers.append('Authorization', 'Bearer ' + token)
      };
    }));
  }
}
