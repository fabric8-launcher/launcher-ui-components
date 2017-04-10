import { Component, Input } from '@angular/core';

import { Gui } from '../../shared/model';
import { ForgeService } from "../../shared/forge.service";
import {KeycloakService} from "../../shared/keycloak.service";

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html'
})
export class DeployComponent {
  @Input() submittedGuis: Gui[];
  @Input() command: string;
  consoleUrl: string;
  deployStarted: boolean;
  statusList: Status[] = [
    new Status("Generating source"),
    new Status("Create github repo"),
    new Status("Pushing the generated code"),
    new Status("Creating openshift project")
  ];

  constructor(private forgeService: ForgeService,
              private kc: KeycloakService) {
  }

  deploy(): void {
    this.deployStarted = true;
    this.forgeService.upload(this.command, this.submittedGuis)
    .then(url => {
      window.location.href = url;
    });
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.submittedGuis);
  }

  login() {
    this.kc.login();
  }

  isAuthenticated():boolean {
    return this.kc.isAuthenticated();
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
  description: string;
  done: boolean;
  constructor(description: string) {
    this.description = description;
  }
}