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

  executeCommand(gui: Gui) {
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.apiUrl + "/execute");

    form.appendChild(this.createFormInput("stepIndex", String(gui.stepIndex)));

    for (let input of gui.inputs) {
      if (input.value instanceof Array) {
        for (let value of input.value) {
          form.appendChild(this.createFormInput(input.name, value));
        }
      } else {
        form.appendChild(this.createFormInput(input.name, input.value));
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
