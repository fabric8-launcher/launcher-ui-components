import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'ngx-launcher';
import { AuthService } from 'app/shared/auth.service';
import { AnalyticService } from './services/app-launcher-analytic.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html'
})
export class WizardComponent {

  constructor(private router: Router, private config: Config,
              public authService: AuthService, analyticService: AnalyticService) {
    analyticService.track();
  }

  public back(): void {
    this.router.navigate(['/']);
  }

  public isHidden(): boolean {
    return this.config.get('targetenvironment_skip') === 'true';
  }

  public get creatorEnabled(): boolean {
    return this.config.get('creator_enabled') === 'true';
  }
}
