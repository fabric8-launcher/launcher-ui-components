import {Component} from "@angular/core";
import {KeycloakService} from "../shared/keycloak.service";
import {Router, ActivatedRoute} from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
  collapse: boolean;
  frontpage: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private keycloak: KeycloakService) {
    FooterComponent.isIntroPage(router, route).subscribe(intro => {
      this.frontpage = intro;
    });
  }
}
