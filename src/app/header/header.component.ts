import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { AuthenticationService, UserService } from "ngx-login-client";
import { LoginService } from "../shared/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
  collapse: boolean;
  wizard: boolean;
  fullName: string;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private login: LoginService,
    userService: UserService) {
    router.events.subscribe((url: any) => {
      this.wizard = url.url !== "/" && url.url !== "/wizard";
    });
    userService.loggedInUser.subscribe(user => this.fullName = user.attributes.fullName);
  }
}
