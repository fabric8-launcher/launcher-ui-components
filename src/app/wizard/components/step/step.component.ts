import {Component, Input} from "@angular/core";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: "step",
  templateUrl: "step.component.html",
  styleUrls: ["step.component.scss"]
})
export class StepComponent extends ButtonComponent {
  @Input() steps: string[];
  @Input() stepIndex: number;
}

