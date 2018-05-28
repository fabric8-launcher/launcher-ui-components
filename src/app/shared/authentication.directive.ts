import {Directive, ElementRef, Input} from "@angular/core";
import {KeycloakService} from "./keycloak.service";

@Directive({
  selector: "[authentication]"
})
export class AuthenticationDirective {
  @Input("authentication") invert: boolean;

  constructor(private el: ElementRef, private keycloak: KeycloakService) {
  }

  ngDoCheck() {
    let authenticated = this.keycloak.isAuthenticated();
    let render = !authenticated;
    if (this.invert) render = !render;
    this.el.nativeElement.style.display = render ? "none" : "block";
  }
}
