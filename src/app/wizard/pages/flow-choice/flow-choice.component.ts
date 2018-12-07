import { Component, Host, OnInit, Optional } from '@angular/core';

import { LauncherComponent, LauncherStep, Projectile, StepState } from 'ngx-launcher';

@Component({
  selector: 'flow-choice',
  templateUrl: './flow-choice.component.html',
  styleUrls: ['./flow-choice.component.scss']
})
export class FlowChoiceComponent extends LauncherStep implements OnInit {
  public completed: boolean = true;
  public selection: Selection = new Selection();

  constructor(@Host() @Optional() public launcherComponent: LauncherComponent,
              private projectile: Projectile<any>) {
    super(projectile);
  }

  public ngOnInit(): void {
    const state = new StepState(this.selection, [
      { name: 'flow', value: 'creatorFlow', restorePath: undefined }
    ]);
    this.projectile.setState(this.id, state);

    if (this.launcherComponent) {
      this.launcherComponent.addStep(this);
    }
    this.restore();
  }

  public restoreModel(model: any): void {
    this.selection.creatorFlow = model.flow;
  }
}

export class Selection {
  public creatorFlow: boolean = true;
}
