import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Request, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Gui, DownloadFile } from './model';

@Injectable()
export class ForgeService {
  private apiUrl: string = process.env.FORGE_URL;
  constructor(private http: Http) {
  }

  commandInfo(): Promise<Gui> {
    return this.http.get(this.apiUrl).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  validate(gui: Gui): Promise<Gui> {
    return this.post(gui, '/validate');
  }

  nextStep(gui: Gui): Promise<Gui> {
    return this.post(gui, '/next');
  }

  executeCommand(gui: Gui): Promise<DownloadFile> {
    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + '/execute',
      responseType: ResponseContentType.ArrayBuffer,
      body: gui
    });
    return this.http.request(new Request(requestOptions)).toPromise()
      .then(response => {
        const filename = response.headers.get('Content-Disposition');
        return {
          binary: new Blob([response.arrayBuffer()], { type: 'application/zip' }),
          filename: filename.substring("attachment; filename='".length, filename.length - 1)
        } as DownloadFile;
      }).catch(this.handleError);
  }

  private post(gui: Gui, action: string): Promise<Gui> {
    return this.http.post(this.apiUrl + action, gui).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || "Error calling service");
  }
}
