import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DependencyCheckService } from 'ngx-forge';
import { KeycloakService } from '../../../shared/keycloak.service';

@Component({
  selector: 'getting-started',
  styleUrls: ['./getting-started.component.scss'],
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent implements OnInit, OnDestroy {
  public projectName: string = '';

  private subscriptions: Subscription[] = [];

  constructor(private keycloak: KeycloakService,
              private dependencyCheckService: DependencyCheckService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.dependencyCheckService.getDependencyCheck().subscribe((val) => {
      this.projectName = val.projectName;
    }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public validateProjectName() {
    this.dependencyCheckService.validateProjectName(this.projectName);
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }

  public routeToApp(): void {
    this.router.navigate(['/wizard', this.projectName]);
  }
}
