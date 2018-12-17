import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { generate } from 'project-name-generator';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  constructor(private router: Router) {
  }

  public launch() {
    this.router.navigate(['/wizard', generate().dashed])
      .catch((e) => console.error(e));
  }

}
