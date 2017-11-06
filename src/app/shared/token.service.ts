import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Location } from '@angular/common';
import { Config } from "ngx-forge";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class TokenService {
  static clusters = ['starter-us-east-1', 'starter-us-west-1', 'starter-us-west-2',
    'starter-ca-central-1', 'pro-us-east-1', 'online-stg'];

  private apiUrl: string = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
  private _inValidTokens: string[] = [];

  constructor(private config: Config, private keycloak: KeycloakService, private http: Http) {
    if (!this.apiUrl) {
      this.apiUrl = config.get("mission_control_url");
    }

    this.apiUrl = Location.joinWithSlash(this.apiUrl.replace(/^wss?/, "http"), "api/validate/token/");

    let tokens = TokenService.clusters.slice(0);
    tokens.push('github');

    keycloak.onLogin.subscribe(authToken => {
      let promises: Promise<string>[] = [];
      tokens.forEach(token => {
        let options = new RequestOptions({headers: new Headers({"Authorization": `Bearer ${authToken}`})});
        promises.push(this.http.head(this.apiUrl + token, options).toPromise().then(() => "").catch(() => token));
      });

      Promise.all(promises).then(tokens => this._inValidTokens = tokens.filter(token => token !== ""));
    });
  }

  get valid(): boolean {
    return this._inValidTokens.indexOf('github') === -1 && this._inValidTokens.length < TokenService.clusters.length;
  }

  get inValidTokens(): string[] {
    return this._inValidTokens;
  }
}