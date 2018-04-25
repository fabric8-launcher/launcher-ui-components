import {Component} from "@angular/core";
import {KeycloakService} from "../shared/keycloak.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
  collapse: boolean;
  frontpage: boolean;
  oldUI: boolean;

  constructor(private router: Router, private keycloak: KeycloakService) {
    router.events.subscribe((url: any) => {
      this.frontpage = url.url !== "/";
      this.oldUI = url.url.indexOf("filtered-wizard") !== -1;
    });
  }
}
