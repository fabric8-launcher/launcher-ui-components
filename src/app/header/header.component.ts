import { Component } from '@angular/core';
import { KeycloakService } from "../shared/keycloak.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  collapse: boolean;
  wizard: boolean;
  constructor(private router: Router, private keycloak: KeycloakService) {
    router.events.subscribe((url:any) => {
      this.wizard = url.url != '/' && url.url != '/wizard';
    });
  }
}
