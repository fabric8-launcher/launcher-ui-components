import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import {authApiUrlProvider, realmProvider, ssoApiUrlProvider} from "./auth.provider";
import {Broadcaster} from "ngx-base";
import {AuthenticationService, HttpService, UserService} from "ngx-login-client";


@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    authApiUrlProvider,
    realmProvider,
    ssoApiUrlProvider,
    AuthenticationService,
    HttpService,
    UserService,
    Broadcaster,

  ]
})
export class AuthModule { }