import { Directive, ElementRef, Input } from "@angular/core";
import { History } from "../wizard/history.component";
import { KeycloakService } from "./keycloak.service";
import { CiDirective } from "./ci.directive";

@Directive({
  selector: '[authentication]'
})
export class AuthenticationDirective extends CiDirective {
  @Input("authentication") invert: boolean;

  constructor(private el: ElementRef, private _history: History, private keycloak: KeycloakService) {
    super(el, _history);
  }

  ngOnInit() { }

  ngDoCheck() {
    let authentication = this.isCiChosen();
    let authenticated = this.keycloak.isAuthenticated();
    let render = authentication && !authenticated;
    if (this.invert) render = !render;
    this.el.nativeElement.style.display = render ? 'none' : 'block';
  }

}
