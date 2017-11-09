import { Component, Input } from "@angular/core";
import { State } from "ngx-forge";
import { History } from "ngx-forge";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "la-buttons",
  templateUrl: "button.component.html"
})
export class ButtonComponent {
  @Input() state: State;
  @Input() validation: Promise<boolean>;
  @Input() disabled: boolean;

  constructor(private history: History, private router: Router, private route: ActivatedRoute) { }

  next() {
    this.gotoStep(this.history.stepIndex + 1);
  }

  gotoStep(step: number) {
    let next = (valid: boolean) => {
      if (valid) {
        this.router.navigate(["../../" + step, this.history.toString()], { relativeTo: this.route });
      }
    };

    if (this.validation != null) {
      this.validation.then(next);
    } else {
      next(true);
    }
  }

  previous() {
    this.gotoStep(this.history.stepIndex - 1);
  }
}

