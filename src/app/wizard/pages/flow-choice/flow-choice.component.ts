import { Component, Host, OnInit, Optional } from '@angular/core';

import { LauncherComponent, LauncherStep, Projectile, StepState } from 'ngx-launcher';

@Component({
  selector: 'flow-choice',
  templateUrl: './flow-choice.component.html',
  styleUrls: ['./flow-choice.component.scss']
})
export class FlowChoiceComponent extends LauncherStep implements OnInit {
  public completed: boolean;
  public creatorFlow: boolean = false;

  constructor(@Host() @Optional() public launcherComponent: LauncherComponent,
              projectile: Projectile<any>) {
    super(projectile);
  }

  public ngOnInit(): void {
    if (this.launcherComponent) {
      this.launcherComponent.addStep(this);
    }
  }
}
