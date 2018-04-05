import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DependencyCheckService } from 'ngx-forge';

@Component({
  selector: 'getting-started',
  styleUrls: ['./getting-started.component.scss'],
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent implements OnInit {
  projectName: string = '';

  private subscriptions: Subscription[] = [];

  constructor(private dependencyCheckService: DependencyCheckService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.dependencyCheckService.getDependencyCheck().subscribe((val) => {
      this.projectName = val.projectName;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  routeToApp(): void {
    this.router.navigate(['/new-wizard', this.projectName]);
  }
}
