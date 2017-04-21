import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Request, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { History, Gui, DownloadFile, SubmittableInput, Input, Version, StatusResult } from './model';
import { Config } from './config.component'

@Injectable()
export class ForgeService {
  private apiUrl: string = process.env.LAUNCHPAD_BACKEND_URL;

  constructor(private http: Http, private config: Config) {
    if (!this.apiUrl) {
      this.apiUrl = config.get('backend_url');
    }

    if (this.apiUrl && this.apiUrl[this.apiUrl.length - 1] != '/') {
      this.apiUrl += '/';
    }
    this.apiUrl += 'launchpad';
  }

  version() : Promise<Version> {
    return this.http.get(this.apiUrl+'/version').toPromise()
    .then(response => response.json() as Version)
    .catch(this.handleError);
  }

  commandInfo(command: string): Promise<Gui> {
    return this.http.get(this.apiUrl + '/commands/' + command).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  validate(command: string, history: History): Promise<Gui> {
    return this.post(history.convert(), '/commands/' + command + '/validate');
  }

  nextStep(command: string, history: History): Promise<Gui> {
    return this.post(history.convert(history.stepIndex), '/commands/' + command + '/next');
  }

  loadGui(command: string, history: History): Promise<Gui> {
    if (history.stepIndex == 0) {
      return this.commandInfo(command);
    } else {
      return this.nextStep(command, history);
    }
  }

  upload(command: string, history: History): Promise<StatusResult> {
    return this.http.post(this.apiUrl + '/commands/' + command + '/missioncontrol', history.convert()).toPromise()
      .then(response => response.json() as StatusResult)
      .catch(this.handleError);
  }

  downloadZip(command: string, history: History) {
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.apiUrl + '/commands/' + command + '/zip');

    form.appendChild(this.createFormInput("stepIndex", String(history.stepIndex)));

    for (var i = 0; i < history.stepIndex; i++) {
      let inputs = history.get(i).inputs;
      if (inputs) {
        for (let input of inputs) {
          if (input.value instanceof Array) {
            for (let value of input.value) {
              form.appendChild(this.createFormInput(input.name, value));
            }
          } else {
            form.appendChild(this.createFormInput(input.name, input.value));
          }
        }
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  private createFormInput(name: string, value: string): HTMLElement {
    let element = document.createElement("input");
    element.setAttribute("type", "hidden");
    element.setAttribute("name", name);
    element.setAttribute("value", value);
    return element;
  }

  private post(submittableGui: Gui, action: string): Promise<Gui> {
    return this.http.post(this.apiUrl + action, submittableGui).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || "Error calling service");
  }
}
