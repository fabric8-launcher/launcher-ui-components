import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Request, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Gui, DownloadFile, SubmittableInput, Input, Version } from './model';
import { Config } from './config.component'

@Injectable()
export class ForgeService {
  private apiUrl: string = process.env.BACKEND_URL;

  constructor(private http: Http, private config: Config) {
    if (!this.apiUrl) {
      this.apiUrl = config.get('backend_url');
    }

    if (this.apiUrl && this.apiUrl[this.apiUrl.length - 1] != '/') {
      this.apiUrl += '/';
    }
    this.apiUrl += 'forge';
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

  validate(command: string, history: Gui[], gui: Gui): Promise<Gui> {
    return this.post(history, gui, '/commands/' + command + '/validate');
  }

  nextStep(command: string, history: Gui[], gui: Gui): Promise<Gui> {
    return this.post(history, gui, '/commands/' + command + '/next');
  }

  upload(command: string, guis: Gui[]): Promise<string> {
    return this.http.post(this.apiUrl + '/commands/' + command + '/catapult', this.convert(guis, guis.length)).toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  downloadZip(command: string, history: Gui[]) {
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.apiUrl + '/commands/' + command + '/zip');

    form.appendChild(this.createFormInput("stepIndex", String(history.length)));

    for (let gui of history) {
      if (gui) {
        let inputs = gui.inputs;
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

  private post(history: Gui[], gui: Gui, action: string): Promise<Gui> {
    return this.http.post(this.apiUrl + action, this.convert(history.concat([gui]), gui.stepIndex)).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  private convert(guis: Gui[], stepIndex: number): Gui {
    let submittableGui = new Gui();
    submittableGui.stepIndex = stepIndex;
    submittableGui.inputs = [];
    for (let gui of guis) {
      if (gui) {
        let inputs = gui.inputs;
        if (inputs) {
          let submittableInputs = this.convertToSubmittable(inputs as Input[]);
          submittableGui.inputs = submittableGui.inputs.concat(submittableInputs);
        }
      }
    }
    return submittableGui;
  }

  private convertToSubmittable(inputs: Input[]): SubmittableInput[] {
    let array: SubmittableInput[] = [];
    if (inputs)
      for (let input of inputs) {
        array.push(new SubmittableInput(input));
      }
    return array;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || "Error calling service");
  }
}
