import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import { Gui, ExecutionResult } from './model';

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

  executeCommand(gui: Gui): Promise<ExecutionResult> {
    return this.post(gui, '/execute');
  }

  private post(gui: Gui, action:string): Promise<any> {
    return this.http.post(this.apiUrl + action, gui).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
