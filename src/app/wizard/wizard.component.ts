import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgeService } from '../shared/forge.service'
import { Gui, Input, Message, Result } from '../shared/model';

import 'rxjs/add/operator/debounceTime';
import * as jsonpatch from 'fast-json-patch';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styles: [`
    .required > label:after {
      content: ' *'
    }
    .ng-invalid {
      border-color: #c00;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    }
    .ng-invalid + div.errorLabel {
      color: red;
      display: block;
    }
    .ng-valid + div.errorLabel {
      display: none;
    }
  `]
})
export class FormComponent {
  @ViewChild('wizard') form: NgForm;
  command: string;
  isValidating: boolean;
  history: Gui[] = [];
  currentGui: Gui = new Gui();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private forgeService: ForgeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.command = params['command'];
      let stepIndex = +params['step'];
      if (params['step'] == 'end') {
        let steps = this.currentGui.state.steps || [];
        this.history.concat(this.currentGui);
        this.currentGui = new Gui();
        this.currentGui.stepIndex = steps.length;
        this.currentGui.inputs = [];
        this.currentGui.results = [];
        return;
      }

      if (this.history[stepIndex]) {
          this.updateGui(this.history[stepIndex], stepIndex);
      } else {
        if (stepIndex == 0) {
          this.forgeService.commandInfo(this.command).then((gui) => {
            this.updateGui(gui, stepIndex);
          }).catch(error => this.currentGui.messages.push(new Message(error)));
        } else {
          this.forgeService.nextStep(this.command, this.history, this.currentGui).then(gui => {
            if (gui.messages && gui.messages.length > 0) {
              this.router.navigate(["../" + --stepIndex], { relativeTo: this.route });
            }
            this.updateGui(gui, stepIndex);
          }).catch(error => this.currentGui.messages.push(new Message(error)));
        }
      }
    });
  }

  validate(form: NgForm): Promise<Gui> {
    if (form.dirty && form.valid) {
      this.history.splice(this.currentGui.stepIndex, this.history.length);
      this.isValidating = true;
      return this.forgeService.validate(this.command, this.history, this.currentGui).then(gui =>
      {
        var diff = jsonpatch.compare(this.currentGui, gui);
        var stepIndex = this.currentGui.stepIndex;
        jsonpatch.apply(this.currentGui, diff);
        this.history[stepIndex] = this.currentGui;
        this.currentGui.stepIndex = stepIndex;
        this.isValidating = false;
        return this.currentGui;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return Promise.resolve(this.currentGui);
  }

  messageForInput(name: string): Message {
    let result: Message;
    if (!this.currentGui.messages) return null;
    for (let message of this.currentGui.messages) {
      if (message.input == name) {
        result = message;
      }
    }
    return result;
  }

  private updateGui(gui: Gui, stepIndex: number) {
    this.history[stepIndex] = gui;
    this.currentGui = gui;
    this.currentGui.stepIndex = stepIndex;
  }

  next() {
    this.gotoStep(++this.currentGui.stepIndex);
  }

  gotoStep(step: number) {
    this.currentGui.stepIndex = step;
    this.router.navigate(["../" + step], { relativeTo: this.route });
  }

  previous() {
    this.gotoStep(--this.currentGui.stepIndex);
  }

  restart() {
    this.router.navigate(["/"]);
  }

  finish() {
    this.router.navigate(["../end"], { relativeTo: this.route });
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}