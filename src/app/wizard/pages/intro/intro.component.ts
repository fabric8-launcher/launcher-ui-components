import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  constructor(private router: Router) {
  }

  public launch() {
    this.router.navigate(['/wizard', 'app-name'])
      .catch((e) => console.error(e));
  }

}
