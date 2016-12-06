import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Request, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Gui, DownloadFile, SubmittableInput, Input } from './model';

@Injectable()
export class ForgeService {
  private apiUrl: string = process.env.FORGE_URL;

  constructor(private http: Http) {
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

  executeCommand(command: string, history: Gui[], stepIndex: number) {
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.apiUrl + '/commands/' + command + '/execute');

    form.appendChild(this.createFormInput("stepIndex", String(stepIndex)));

    for (let gui of history) {
      for (let input of gui.inputs) {
        if (input.value instanceof Array) {
          for (let value of input.value) {
            form.appendChild(this.createFormInput(input.name, value));
          }
        } else {
          form.appendChild(this.createFormInput(input.name, input.value));
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
    return this.http.post(this.apiUrl + action, this.convert(history.concat(gui), gui.stepIndex)).toPromise()
      .then(response => response.json() as Gui)
      .catch(this.handleError);
  }

  private convert(guis: Gui[], stepIndex: number): Gui {
    let submittableGui = new Gui();
    submittableGui.stepIndex = stepIndex;
    submittableGui.inputs = [];
    for (let gui of guis) {
      let submittableInputs = this.convertToSubmittable(gui.inputs as Input[]);
      submittableGui.inputs = submittableGui.inputs.concat(submittableInputs);
    }
    return submittableGui;
  }

  private convertToSubmittable(inputs: Input[]): SubmittableInput[] {
    let array: SubmittableInput[] = [];
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
