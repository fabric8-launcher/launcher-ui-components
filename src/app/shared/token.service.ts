import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Location } from '@angular/common';
import { Config } from "ngx-forge";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class TokenService {
  clusters: string [] = [];

  private apiUrl: string = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
  private _inValidTokens: string[] = [];

  constructor(private config: Config, private keycloak: KeycloakService, private http: Http) {
    if (!this.apiUrl) {
      this.apiUrl = config.get("mission_control_url");
    }

    let baseUrl = this.apiUrl.replace(/^ws?/, "http");
    this.http.get(Location.joinWithSlash(baseUrl, "api/openshift/clusters?all")).subscribe(response => {
      this.apiUrl = Location.joinWithSlash(baseUrl, "api/validate/token/");

      this.clusters = response.json() as string[];
      let tokens = this.clusters.map(e => {return {query: e, prefix: 'openshift'}});
      tokens.push({'prefix': 'github', query: null});

      keycloak.onLogin.subscribe(authToken => {
        let promises: Promise<string>[] = [];
        tokens.forEach(token => {
          let options = new RequestOptions({headers: new Headers({"Authorization": `Bearer ${authToken}`})});
          promises.push(this.http.head(this.apiUrl + token.prefix + (token.query ? `?cluster=${token.query}`: ''),
            options).toPromise().then(() => "").catch(() => token.query ? token.query : token.prefix));
        });

        Promise.all(promises).then(tokens => this._inValidTokens = tokens.filter(token => token !== ""));
      });
    });
  }

  get valid(): boolean {
    return this._inValidTokens.indexOf('github') === -1 && this._inValidTokens.length < this.clusters.length;
  }

  get inValidTokens(): string[] {
    return this._inValidTokens;
  }
}