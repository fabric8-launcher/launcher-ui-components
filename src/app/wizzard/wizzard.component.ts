import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgeService } from './forge.service'
import { Gui, ProjectSettings } from './model';

@Component({
  selector: 'wizzard-step1',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss'],
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

  closeAlert() {
    this.showError = false;
  }
}
