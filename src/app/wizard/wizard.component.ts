import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgeService } from './forge.service'
import { Gui, Input, Message, Result } from './model';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styles: [`
    .required > label:after {
      content: ' *'
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
    private forgeService: ForgeService) {
  }

  ngOnInit() {
    this.command = this.route.snapshot.params['command'];
    this.forgeService.commandInfo(this.command).then((gui) => {
      this.currentGui = gui;
      this.currentGui.messages = [];
      this.currentGui.stepIndex = this.history.length;
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(500)
      .subscribe(data => {
        if (!this.fromHttp) {
          this.validate(this.form);
        }
        this.fromHttp = false;
    });
  }

  validate(form: NgForm): Promise<Gui> {
    if (form.dirty && form.valid) {
      return this.forgeService.validate(this.command, this.history, this.currentGui).then(gui =>
      {
        this.updateGui(gui);
        return this.currentGui;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return Promise.resolve(this.currentGui);
  }

  next() {
    this.currentGui.stepIndex++;
    this.forgeService.nextStep(this.command, this.history, this.currentGui).then(gui => {
      this.history.push(this.currentGui);
      this.updateGui(gui);
    }).catch(error => this.currentGui.messages.push(new Message(error)));
  }

  private updateGui(gui: Gui) {
    this.fromHttp = true;
    this.currentGui = gui;
    this.currentGui.stepIndex = this.history.length;
  }

  previous() {
    this.currentGui = this.history.pop();
    this.currentGui.stepIndex = this.history.length;
  }

  restart() {
    this.history = [];
    this.ngOnInit();
  }

  finish() {
    this.validate(this.form).then(_ => {
      this.history.push(this.currentGui);
      this.currentGui = new Gui();
      this.currentGui.stepIndex = this.history.length - 1;
      this.currentGui.inputs = [];
      this.currentGui.results = [new Result("Your project is ready to download")];
    });
  }

  onSubmit() {
    this.forgeService.executeCommand(this.command, this.history, this.currentGui.stepIndex);
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}