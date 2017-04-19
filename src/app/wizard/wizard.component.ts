import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgeService } from '../shared/forge.service'
import { GuiService } from "../shared/gui.service";
import { History, Gui, Input, Message, Result } from '../shared/model';


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
    private guiService: GuiService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let state = params['state'];
      this.command = params['command'];
      let stepIndex = +params['step'];

      if (!this.history.get(stepIndex)) {
        let gui = this.guiService.getGui(stepIndex);
        this.history.add(gui);
      } else {
        this.history.resetTo(stepIndex);
      }
    });
  }

  get currentGui(): Gui {
    return this.history.currentGui();
  }

  validate(form: NgForm): Promise<boolean> {
    if (form.valid) {
      this.validation = this.guiService.validate(this.history.stepIndex, this.history).then(gui =>
      {
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
    this.router.navigate(["../" + step], { relativeTo: this.route });
  }

  previous() {
    this.gotoStep(--this.currentGui.stepIndex);
  }

  restart() {
    this.router.navigate(["/"]);
  }

  finish() {
    let finish = (valid: boolean) => {
      if (valid) {
        this.router.navigate(["../end"], { relativeTo: this.route }) 
      }
    };

    if (this.validation) {
      this.validation.then(finish);
    } else {
      this.validate(this.form).then(finish);
    }
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}