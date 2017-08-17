import { Directive, ElementRef, Input } from "@angular/core";
import { History } from "../wizard/history.component";

import { AuthenticationService } from 'ngx-login-client';

@Directive({
  selector: "[authentication]"
})
export class AuthenticationDirective {
  @Input("authentication") invert: boolean;

  constructor(private el: ElementRef, private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let authenticated = this.auth.isLoggedIn();
    let render = !authenticated;
    if (this.invert) render = !render;
    this.el.nativeElement.style.display = render ? "none" : "block";
  }
}
