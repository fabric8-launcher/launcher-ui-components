import { Injectable, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Broadcaster } from "ngx-base";
import { AuthenticationService, UserService, AUTH_API_URL } from "ngx-login-client";
import { History } from "../wizard/history.component";
import { Message } from "./model";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  constructor(
    @Inject(AUTH_API_URL) private authUrl: string,
    private broadcaster: Broadcaster,
    private authService: AuthenticationService,
    private history: History,
    private route: ActivatedRoute) {
    this.broadcaster.on('authenticationError').subscribe(() => {
      this.authService.logout();
    });
    this.broadcaster.on('noFederatedToken').subscribe(() => {
      this.history.currentGui.messages.push(new Message("No federated tokens found be sure to link github and openshift"));
      this.authService.logout();
    });
    this.route
      .queryParams
      .subscribe(params => {
        if (params['token_json'] != null) {
          this.authService.logIn(params['token_json']);
        }
      });
  }

  login() {
    let authUrl = this.authUrl + "login/authorize/?link=true&redirect=" + window.location.href;
    window.location.href = authUrl;
  }
}