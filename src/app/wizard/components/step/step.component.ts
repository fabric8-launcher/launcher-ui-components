import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'step',
  templateUrl: "step.component.html"
})
export class StepComponent extends ButtonComponent {
  @Input() steps: string[];
  @Input() stepIndex: number;
}

