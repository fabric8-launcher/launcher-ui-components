import { Component, Input, HostListener } from "@angular/core";
import { State } from "../../../shared/model";
import { History } from "../../history.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "la-buttons",
  templateUrl: "button.component.html"
})
export class ButtonComponent {
  footerBarSize: number = 70;
  @Input() state: State;
  @Input() validation: Promise<boolean>;
  @Input() disabled: boolean;
  fix: string = this.history.stepIndex === 2 ? 'fixed' : 'inherit';

  constructor(private history: History, private router: Router, private route: ActivatedRoute) { 
    window.onscroll = () => {
      let windowHeight = "innerHeight" in window ? window.innerHeight
          : document.documentElement.offsetHeight;
      let body = document.body, html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight,
          body.offsetHeight, html.clientHeight,
          html.scrollHeight, html.offsetHeight);
      let windowBottom = windowHeight + window.pageYOffset;
      this.fix = windowBottom >= docHeight - this.footerBarSize ? 'inherit' : 'fixed';
   };
  }

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

