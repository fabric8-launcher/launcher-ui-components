import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
          this.currentGui.results = [new Result("Your project is ready to download")];
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
            this.updateGui(gui, stepIndex);
          }).catch(error => this.currentGui.messages.push(new Message(error)));
        }
      }
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
        this.updateGui(gui, this.currentGui.stepIndex);
        return this.currentGui;
      }).catch(error => this.currentGui.messages.push(new Message(error)));
    }
    return Promise.resolve(this.currentGui);
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
    this.router.navigate(["../end"], { relativeTo: this.route });
  }

  onSubmit() {
    this.forgeService.executeCommand(this.command, this.history, this.currentGui.stepIndex);
  }

  closeAlert(error: Message) {
    error.showError = true;
  }
}