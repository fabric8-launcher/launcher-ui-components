import { Component, Input } from "@angular/core";
import { KeycloakService } from "../../../shared/keycloak.service";

import { Gui } from "ngx-forge";

@Component({
  selector: "mission",
  templateUrl: "mission.page.html"
})
export class MissionPage {
  @Input() gui: Gui;
  @Input() authenticationNeeded: boolean;

  constructor(private keycloak: KeycloakService) {}
}

