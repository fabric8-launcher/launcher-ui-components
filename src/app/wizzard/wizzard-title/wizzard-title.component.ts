import { Component, Input } from '@angular/core';

@Component({
  selector: 'wizzard-title',
  templateUrl: './wizzard-title.component.html',
  styleUrls: ['./wizzard-title.component.scss'],
})
export class WizzardHeaderComponent {
  @Input() activeStep: number;
  isActive(step: number): boolean {
    return step == this.activeStep;
  }
}