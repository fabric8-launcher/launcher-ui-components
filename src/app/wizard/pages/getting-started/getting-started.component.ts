import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'getting-started',
  styleUrls: ['./getting-started.component.scss'],
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent {
  public projectName: string = '';
  public creationType = '';

  constructor(private router: Router, public authService: AuthService) {}

  public cancel(): void {
    this.router.navigate(['/']);
  }

  public routeToApp(): void {
    this.router.navigate(['/wizard' + this.creationType, this.projectName]);
  }
}
