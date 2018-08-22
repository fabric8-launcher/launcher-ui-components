import { TokenProvider } from 'ngx-launcher';
import { KeycloakService } from './keycloak.service';

export class AuthTokenProvider extends TokenProvider {

  constructor(private keycloakService: KeycloakService) {
    super();
  }

  public getToken(): string | Promise<string> {
    return this.keycloakService.getToken();
  }
}
