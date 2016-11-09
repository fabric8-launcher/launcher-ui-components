import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgeService } from './forge.service'
import { Gui, Input, ProjectSettings } from './model';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [
    ProjectSettings
  ]
})
export class FormComponent {
  showError: boolean = false;
  feedbackMessage: string = '';
  currentGui: Gui = new Gui();

  constructor(
    private router: Router,
    private forgeService: ForgeService,
    private settings: ProjectSettings) {
    this.forgeService.executeAction().then((gui) => {
      this.currentGui = gui;
    });
  }

  getInputType(input: Input):string {
    if (input.valueType == 'java.lang.String') {
      return 'text';
    } else if (input.valueType == 'java.lang.Boolean') {
      return 'checkbox';
    }
    return 'text';
  }

  closeAlert() {
    this.showError = false;
  }
}
