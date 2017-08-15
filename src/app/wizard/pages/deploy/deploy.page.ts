import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {ForgeService} from "../../../shared/forge.service";
import {KeycloakService} from "../../../shared/keycloak.service";
import {History} from "../../history.component";

@Component({
  selector: "deploy",
  templateUrl: "./deploy.page.html",
  styleUrls: ["./deploy.page.scss"]
})
export class DeployPage implements OnInit {
  @Input() command: string;
  pageNumbers: number[];

  constructor(private forgeService: ForgeService,
              private route: ActivatedRoute,
              private router: Router,
              private history: History,
              private kc: KeycloakService) {
  }

  ngOnInit() {
    this.pageNumbers = Array(this.history.stepIndex - 1).fill(1).map((x, i) => i + 1);
  }

  downloadZip(): void {
    this.forgeService.downloadZip(this.command, this.history);
    this.navigateStep(1);
  }

  back() {
    this.navigateStep(-1);
  }

  private navigateStep(diff: number) {
    this.router.navigate(["../../" + (this.history.stepIndex + diff), this.history.toString()], {relativeTo: this.route});
  }
}