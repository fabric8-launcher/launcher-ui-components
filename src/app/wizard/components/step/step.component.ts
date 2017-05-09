import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: "step.component.html"
})
export class StepComponent {
  @Input() steps: string[];
  @Input() stepIndex: number;
  @Output() onclick = new EventEmitter<number>();

  onclicked(index: number) {
    this.onclick.emit(index);
  }
}

