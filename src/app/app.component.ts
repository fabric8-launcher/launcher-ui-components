import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: "body",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: {
    "[class.cards-pf]": "intro"
  }
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((url: any) => {
      this.intro = url.url !== "/" && url.url !== "/wizard";
    });

    router.events.distinctUntilChanged((previous: any, current: any) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {
      let snapshot = route.snapshot;
      let activated = route.firstChild;
      if (activated != null) {
        while (activated != null) {
          snapshot = activated.snapshot;
          activated = activated.firstChild;
        }
      }

      if (window['analytics']) {
        window['analytics'].page({
          name: snapshot.data.name + (snapshot.params.step || ''),
          properties: snapshot.params
        });
      }
    });
  }

  intro: boolean;
}