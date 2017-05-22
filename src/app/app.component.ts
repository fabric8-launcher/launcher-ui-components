import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "body",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: {
    "[class.cards-pf]": "intro"
  }
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((url: any) => {
      this.intro = url.url !== "/" && url.url !== "/wizard";
    });
  }

  intro: boolean;
}