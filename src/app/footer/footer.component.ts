import { Component } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})

export class FooterComponent {
  wizard: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    FooterComponent.isIntroPage(router, route).subscribe(intro => this.wizard = intro);
  }


  static isIntroPage(router: Router, route: ActivatedRoute): Observable<boolean> {
    return router
      .events
      .filter(e => e instanceof NavigationEnd)
      .map(() => route)
      .map(route => {
        if (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .map(e => e['name'] === 'intro')
  }
}
