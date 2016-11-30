import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgeService } from './forge.service'
import { Gui, Input, Message, Result } from './model';

import { IMultiSelectSettings } from '../shared/multiselect-dropdown';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class FormComponent implements AfterViewInit {
  @ViewChild('wizard') form: NgForm;
  fromHttp: boolean;
  history: Gui[] = [];
  currentGui: Gui = new Gui();

  constructor(
    private forgeService: ForgeService) {
  }

  ngOnInit() {
    this.forgeService.commandInfo().then((gui) => {
      this.currentGui = gui;
      this.currentGui.messages = [];
      this.currentGui.stepIndex = this.history.length;
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(2000)
      .subscribe(data => {
        if (!this.fromHttp) {
          this.validate(this.form);
        }
        this.fromHttp = false;
    });
  }

  validate(form: NgForm): Promise<Gui> {
    if (form.dirty && form.valid) {
      return this.forgeService.validate(this.history, this.currentGui).then(gui =>
      {
        this.fromHttp = true;
        this.currentGui = gui;
        this.currentGui.stepIndex = this.history.length;
        return this.currentGui;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return Promise.resolve(this.currentGui);
  }

  next() {
    this.forgeService.nextStep(this.history, this.currentGui).then(gui => {
      this.history.push(this.currentGui);
      this.currentGui = gui;
      this.currentGui.stepIndex = this.history.length;
    }).catch(error => this.currentGui.messages.push(new Message(error)));
  }

  previous() {
    this.currentGui = this.history.pop();
    this.currentGui.stepIndex = this.history.length;
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
    this.forgeService.executeCommand(this.history, this.currentGui.stepIndex);
  }

  convertToOptions(options: string[]): any[] {
    let result: any[] = [];
    for (let option of options) {
      result.push({id: option, name: option});
    }
    return result;
  }

  private searchMultiSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    showUncheckAll: true
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}
