import { TokenProvider } from 'ngx-launcher';
import { KeycloakService } from './keycloak.service';

export class KeycloakTokenProvider extends TokenProvider {

  constructor(private keycloak: KeycloakService) {
    super();
  }

  public getToken(): string | Promise<string> {
    return this.keycloak.getToken();
  }
}
