import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgeService } from './forge.service'
import { Gui, Input, Message } from './model';

import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { saveAs } from 'file-saver';
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
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(2000)
      .subscribe(data => {
        if (!this.fromHttp) {
          this.changed(this.form);
        }
        this.fromHttp = false;
    });
  }

  changed(form: NgForm) {
    if (form.dirty && form.valid) {
      this.forgeService.validate(this.currentGui).then(gui =>
      {
        this.fromHttp = true;
        this.currentGui = gui;
        this.currentGui.stepIndex = this.history.length;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
  }

  next() {
    this.history.push(this.currentGui);
    this.currentGui.stepIndex = this.history.length;
    this.forgeService.nextStep(this.currentGui).then(gui => {
      this.currentGui = gui;
      this.currentGui.stepIndex = this.history.length;
    }).catch(error => this.currentGui.messages.push(new Message(error)));
  }

  previous() {
    this.currentGui = this.history.pop();
    this.currentGui.stepIndex = this.history.length;
  }

  onSubmit() {
    this.forgeService.executeCommand(this.currentGui);
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
