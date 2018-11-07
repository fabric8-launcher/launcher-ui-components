import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'creator-wizard',
  templateUrl: './creator-wizard.component.html'
})
export class CreatorWizardComponent {

  constructor(private router: Router) {
  }

  public back(): void {
    this.router.navigate(['/']);
  }
}
