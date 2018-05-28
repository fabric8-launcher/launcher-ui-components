import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "wizard",
  templateUrl: "./wizard.component.html"
})
export class WizardComponent {

  constructor(private router: Router) {
  }

  back(): void {
    this.router.navigate(['/']);
  }
}