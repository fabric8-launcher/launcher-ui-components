import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent {

  constructor(private router: Router) {}

  startWizard() {
    this.router.navigate(['/wizard']);
  }
}