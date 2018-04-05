import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {KeycloakService} from "../shared/keycloak.service";

@Component({
  selector: "new-wizard",
  templateUrl: "./new-wizard.component.html"
})
export class WizardComponent {
  constructor(private router: Router) {}

  back(): void {
    this.router.navigate(['/']);
  }
}