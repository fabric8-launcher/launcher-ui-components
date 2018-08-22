import { Directive, DoCheck, ElementRef, Input } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[authentication]'
})
export class AuthenticationDirective implements DoCheck {

  @Input() public authentication: boolean;

  constructor(private el: ElementRef, private authService: AuthService) {
  }

  public ngDoCheck() {
    const authenticated = this.authService.isAuthenticated();
    let render = !authenticated;
    if (this.authentication) {
      render = !render;
    }
    this.el.nativeElement.style.display = render ? 'none' : 'block';
  }
}
