import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import { KeycloakService } from "../../../shared/keycloak.service";

@Component({
  selector: "mission",
  templateUrl: "mission.page.html"
})
export class MissionPage {
  @Input() gui: Gui;
  @Input() authenticationNeeded: boolean;

  constructor(private keycloak: KeycloakService) {}
}

