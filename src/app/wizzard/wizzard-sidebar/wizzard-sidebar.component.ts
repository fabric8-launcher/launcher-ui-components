import { Component, Input } from '@angular/core';

@Component({
  selector: 'wizzard-sidebar',
  templateUrl: './wizzard-sidebar.component.html',
  host: {'class': 'wizard-pf-sidebar'}
})
export class WizzardSidebarComponent {
  @Input() activeStep: string;
  isActive(step: string): boolean {
    return step == this.activeStep;
  }
}