import {Component} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";

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

    router.events.distinctUntilChanged((previous: any, current: any) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {
      window['analytics'].page();
    });
  }

  intro: boolean;
}