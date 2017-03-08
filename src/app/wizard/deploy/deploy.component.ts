import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Gui } from '../../shared/model';
import { ForgeService } from "../../shared/forge.service";

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html'
})
export class DeployComponent {
  @Input() submittedGuis: Gui[];
  @Input() command: string;
  consoleUrl: string;
  statusList: Status[] = [
    new Status("Generating source"),
    new Status("Create github repo"),
    new Status("Pushing the generated code"),
    new Status("Creating openshift project")
  ]

  constructor(private router: Router,
    private forgeService: ForgeService) {
  }

  mockDeploy(): void {
    let index = 0;
    let interval = setInterval(_ => {
      this.statusList[index++].done = true;
      if (index == this.statusList.length) {
        clearInterval(interval);
      }
    }, 2000);
  }

  deploy(): void {
    this.forgeService.upload(this.command, this.submittedGuis)
    .then(url => {
      this.consoleUrl = url;
    });
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.submittedGuis);
  }


  progress(): number {
    let result = 0;
    for (let status of this.statusList) {
      if (status.done) {
        result++;
      }
    }
    return Math.round(result / this.statusList.length * 100);
  }
}

export class Status {
  description: string
  done: boolean
  constructor(description: string) {
    this.description = description;
  }
}