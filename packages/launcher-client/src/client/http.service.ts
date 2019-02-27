import axios from 'axios';
import 'reflect-metadata';
import { Injectable } from 'injection-js';

import { Locations } from './helpers/locations';

export interface RequestConfig {
  headers: object;
}

@Injectable()
export class HttpService {

  private readonly http = axios.create();

  public async get<T>(url: string, endpoint: string, config?: RequestConfig): Promise<T> {
    return this.http.get(Locations.joinPath(url, endpoint), config)
      .then(response => response.data, this.handleError);
  }

  public async head<T>(url: string, endpoint: string, config?: RequestConfig): Promise<T> {
    return this.http.head(Locations.joinPath(url, endpoint), config)
      .then(response => response.data, this.handleError);
  }

  public async post<T, R>(url: string, endpoint: string, data: T, config?: RequestConfig): Promise<R> {
    return this.http.post(Locations.joinPath(url, endpoint), data, config)
      .then(response => response.data, this.handleError);
  }

  private handleError(reason: any) {
    let errMsg: string;
    if (reason && reason.message) {
      errMsg = `An error occurred: ${reason.message}`;
    } else {
      errMsg = `Backend returned ${reason}`;
    }
    throw new Error(errMsg);
  }
}
