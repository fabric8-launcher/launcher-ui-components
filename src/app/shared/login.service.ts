import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Broadcaster } from "ngx-base";
import { AuthenticationService, UserService, AUTH_API_URL } from "ngx-login-client";
import { History } from "../wizard/history.component";
import { Message } from "./model";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  constructor(
    @Inject(AUTH_API_URL) private authUrl: string,
    private router: Router,
    private broadcaster: Broadcaster,
    private authService: AuthenticationService,
    private history: History
  ) {
    this.broadcaster.on('authenticationError').subscribe(() => {
      this.authService.logout();
    });
    this.broadcaster.on('noFederatedToken').subscribe(() => {
      this.history.currentGui.messages.push(new Message("No federated tokens found be sure to link github and openshift"));
      this.authService.logout();
    });
  }

login() {
    let query = window.location.search.substr(1);
    let result: any = {};
    query.split('&').forEach(function (part) {
      let item: any = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    if (result['error']) {
      this.history.currentGui.messages.push(new Message(result['error']));
    } else if (result['token_json']) {
      this.authService.logIn(result['token_json']);
      this.router.navigateByUrl(this.router.url);
    } else {
      this.redirectToAuth();
    }
  }

  redirectToAuth() {
    var authUrl = this.authUrl;
    if (authUrl.indexOf('?') < 0) {
      // lets ensure there's a redirect parameter to avoid WIT barfing
      authUrl += "?redirect=" + window.location.href;
    }
    window.location.href = authUrl;
  }
}