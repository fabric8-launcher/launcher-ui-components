import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
})
export class IntroComponent {
  constructor(private router: Router) {}

  requestEarlyAccess() {
      window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSe9IcY0TUSdSheW3-33BWs9FsgCYwPXybAuY_kcdexhY_NNTA/viewform?usp=sf_link';
    }

  launch() {
    this.router.navigate(["/wizard", "launchpad-new-project", 1, "e30="]);
  }
}