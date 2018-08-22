import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { KeycloakService } from '../shared/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public collapse: boolean;
  public frontpage: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private keycloakService: KeycloakService) {
    FooterComponent.isIntroPage(router, route).subscribe((intro) => {
      this.frontpage = intro;
    });
  }
}
