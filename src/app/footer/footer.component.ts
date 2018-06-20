import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {

  public static isIntroPage(router: Router, route: ActivatedRoute): Observable<boolean> {
    return router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => route.firstChild ? route.firstChild : route),
      filter((r) => r.outlet === 'primary'),
      mergeMap((r) => r.data),
      map((e) => e['name'] === 'intro')
    );
  }

  public wizard: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    FooterComponent.isIntroPage(router, route).subscribe((intro) => this.wizard = intro);
  }
}
