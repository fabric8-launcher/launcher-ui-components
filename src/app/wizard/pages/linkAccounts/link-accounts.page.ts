
import { Component } from "@angular/core";
import { KeycloakService } from "../../../shared/keycloak.service";

@Component({
  selector: "link-accounts",
  templateUrl: "link-accounts.page.html",
  styleUrls: ["link-accounts.page.scss"]
})
export class LinkAccountsPage {
  clusters = ['starter-us-east-1', 'starter-us-west-1', 'starter-us-west-2',
    'starter-ca-central-1', 'pro-us-east-1', 'online-stg'];

  constructor(private keycloak: KeycloakService) {}

}