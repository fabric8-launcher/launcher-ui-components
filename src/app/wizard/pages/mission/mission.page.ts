import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate } from "@angular/core";
import { Gui } from "../../../shared/model";
import { KeycloakService } from "../../../shared/keycloak.service";
import { animation } from "../animation";

@Component({
  selector: "mission",
  templateUrl: "mission.page.html",
  animations: animation.animations,
  host: animation.host
})
export class MissionPage {
  @Input() gui: Gui;
  @Input() authenticationNeeded: boolean;

  constructor(private keycloak: KeycloakService) {}
}

