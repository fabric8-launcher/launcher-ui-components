import { Component, Host, OnInit, Optional } from '@angular/core';

import { LauncherComponent, LauncherStep, Projectile, StepState, Config } from 'ngx-launcher';

@Component({
  selector: 'flow-choice',
  templateUrl: './flow-choice.component.html',
  styleUrls: ['./flow-choice.component.scss']
})
export class FlowChoiceComponent extends LauncherStep implements OnInit {
  public completed: boolean = true;
  public selection: Selection;

  constructor(@Host() @Optional() public launcherComponent: LauncherComponent,
              private config: Config,
              private projectile: Projectile<any>) {
    super(projectile);
    this.selection = new Selection(this.config.get('creator_enabled') === 'true');
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
  private _creatorFlow: boolean;
  constructor(flowEnable: boolean) {
    this._creatorFlow = flowEnable;
  }

  get creatorFlow(): boolean {
    return this._creatorFlow;
  }

  set creatorFlow(creatorFlow: boolean) {
    this._creatorFlow = creatorFlow;
  }
}
