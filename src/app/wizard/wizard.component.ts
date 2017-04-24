import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgeService } from '../shared/forge.service'
import { History, Gui, Input, Message, Result } from '../shared/model';

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
export class FormComponent implements OnInit {
  @ViewChild('wizard') form: NgForm;
  command: string;
  validation: Promise<boolean>;
  history: History = new History();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private forgeService: ForgeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let state = params['state'];
      this.command = params['command'];
      let stepIndex = +params['step'];

      this.history.resetTo(stepIndex);

      new Array(stepIndex + 1).fill(1).map((_, i) => i + 1).reduce((p, index) => {
        if (stepIndex + 1 == index) {
          return p.then(() => {
            if (stepIndex == this.currentGui.state.steps.length + 1) {
              let endGui = new Gui();
              endGui.state.steps = this.currentGui.state.steps;
              endGui.inputs = [];
              endGui.results = [];
              this.history.resetTo(index - 1);
              this.history.add(endGui);
            }

            this.history.apply(state);
          });
        }
        if (!this.history.get(index)) {
          return p.then(() => this.forgeService.loadGui(this.command, this.history)).then((gui:any) => {
            this.history.add(gui);
          });
        }
        return Promise.resolve();
      }, Promise.resolve());
    });
  }

  get currentGui(): Gui {
    return this.history.currentGui();
  }

  validate(form: NgForm): Promise<boolean> {
    if (form.valid) {
      this.validation = this.forgeService.validate(this.command, this.history).then(gui =>
      {
        var stepIndex = this.currentGui.stepIndex;
        var diff = jsonpatch.compare(this.currentGui, gui);
        jsonpatch.apply(this.currentGui, diff);
        this.currentGui.stepIndex = stepIndex;
        this.currentGui.messages = gui.messages;
        return this.currentGui.messages.length == 0;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return this.validation;
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

  next() {
    this.gotoStep(++this.currentGui.stepIndex);
  }

  gotoStep(step: number) {
    let next = (valid: boolean) => {
      if (valid) {
        this.router.navigate(["../../" + step, this.history.toString()], { relativeTo: this.route });
      }
    };

    if (this.validation) {
      this.validation.then(next);
    } else {
      next(true);
    }
  }

  previous() {
    this.gotoStep(--this.currentGui.stepIndex);
  }

  restart() {
    this.router.navigate(["/"]);
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}