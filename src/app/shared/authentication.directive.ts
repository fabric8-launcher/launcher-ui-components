import { Directive, DoCheck, ElementRef, Input } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Directive({
  selector: '[authentication]'
})
export class AuthenticationDirective implements DoCheck {

  @Input() public authentication: boolean;

  constructor(private el: ElementRef, private keycloak: KeycloakService) {
  }

  public ngDoCheck() {
    const authenticated = this.keycloak.isAuthenticated();
    let render = !authenticated;
    if (this.authentication) {
      render = !render;
    }
    this.el.nativeElement.style.display = render ? 'none' : 'block';
  }
}
