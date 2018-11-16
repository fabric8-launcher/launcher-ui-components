import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'ngx-launcher';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html'
})
export class WizardComponent {

  constructor(private router: Router, private config: Config) {
  }

  public back(): void {
    this.router.navigate(['/']);
  }

  public isHidden(): boolean {
    return this.config.get('targetenvironment_skip') === 'true';
  }
}
