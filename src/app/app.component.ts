import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.cards-pf') private intro: boolean;

  constructor(router: Router) {
    router.events.subscribe((url: any) => {
      this.intro = url.url !== '/' && url.url !== '/wizard';
    });
  }

}
