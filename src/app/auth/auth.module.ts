import { NgModule } from "@angular/core";
import { HttpModule, Http, RequestOptions, XHRBackend } from "@angular/http";

import {authApiUrlProvider, realmProvider, ssoApiUrlProvider} from "./auth.provider";
import { Broadcaster, Logger } from "ngx-base";
import { AuthenticationService, HttpService, UserService, AUTH_API_URL, SSO_API_URL, REALM } from "ngx-login-client";

export function httpFactory(backend: any, options: any, broadcaster: Broadcaster) {
  return new HttpService(backend, options, broadcaster);
}

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    authApiUrlProvider,
    realmProvider,
    ssoApiUrlProvider,
    Logger,
    Broadcaster,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, Broadcaster],
      useFactory: httpFactory
    },
    {
      provide: AuthenticationService,
      deps: [Broadcaster, AUTH_API_URL, SSO_API_URL, REALM, Http],
      useClass: AuthenticationService
    },
    {
      provide: UserService,
      deps: [ Http, Logger, Broadcaster, AUTH_API_URL],
      useClass: UserService
    }
  ]
})
export class AuthModule { }