import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class FormComponent implements AfterViewInit {
  @ViewChild('wizard') form: NgForm;
  command: string;
  fromHttp: boolean;
  history: Gui[] = [];
  currentGui: Gui = new Gui();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private forgeService: ForgeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.command = params['command'];
      if (params['step'] == 'end') {
        return this.validate(this.form).then(_ => {
          this.currentGui = new Gui();
          this.currentGui.stepIndex = this.history.length - 1;
          this.currentGui.inputs = [];
          this.currentGui.results = [new Result("Your project is is downloading...")];
        });
      }

      let stepIndex = +params['step'];
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

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(1000).distinctUntilChanged()
      .subscribe(data => {
        if (!this.fromHttp) {
          this.validate(this.form);
        }
        this.fromHttp = false;
    });
  }

  validate(form: NgForm): Promise<Gui> {
    if (form.dirty && form.valid) {
      this.history.splice(this.currentGui.stepIndex, this.history.length);
      return this.forgeService.validate(this.command, this.history, this.currentGui).then(gui =>
      {
        var diff = jsonpatch.compare(this.currentGui, gui);
        var stepIndex = this.currentGui.stepIndex;
        jsonpatch.apply(this.currentGui, diff);
        this.history[stepIndex] = this.currentGui;
        this.currentGui.stepIndex = stepIndex;
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
    this.fromHttp = true;
    this.currentGui = gui;
    this.currentGui.stepIndex = stepIndex;
  }

  next() {
    this.router.navigate(["../" + ++this.currentGui.stepIndex], { relativeTo: this.route });
  }

  previous() {
    this.router.navigate(["../" + --this.currentGui.stepIndex], { relativeTo: this.route });
  }

  restart() {
    this.router.navigate(["/"]);
  }

  finish() {
    this.forgeService.executeCommand(this.command, this.history, this.currentGui.stepIndex);
    this.router.navigate(["../end"], { relativeTo: this.route });
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}