import {TokenProvider} from "ngx-forge";
import {KeycloakService} from "./keycloak.service";

export class KeycloakTokenProvider extends TokenProvider {

  constructor(private keycloak: KeycloakService) {
    super();
  }

  getToken(): string {
    return this.keycloak.getToken();
  }
}