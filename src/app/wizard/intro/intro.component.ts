import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent {
  projectType: string = "launchpad-new-project";
  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/wizard', this.projectType, 0]);
  }

  versions() {
    this.router.navigate(['/wizard', 'supported-versions']);
  }
}