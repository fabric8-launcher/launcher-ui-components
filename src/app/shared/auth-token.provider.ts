import { TokenProvider } from 'ngx-launcher';
import { AuthService } from './auth.service';

export class AuthTokenProvider extends TokenProvider {

  constructor(private authService: AuthService) {
    super();
  }

  public getToken(): string | Promise<string> {
    return this.authService.getToken();
  }
}
