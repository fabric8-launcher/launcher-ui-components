import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { Config } from 'ngx-launcher';

@Component({
  selector: 'getting-started',
  styleUrls: ['./getting-started.component.scss'],
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent {
  public projectName: string = '';
  public creationType = '';
  public creatorEnabled = true;

  constructor(private router: Router, public authService: AuthService, config: Config) {
    this.creatorEnabled = config.get('creator_enabled') === 'true';
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }

  public routeToApp(): void {
    this.router.navigate(['/wizard' + this.creationType, this.projectName]);
  }
}
