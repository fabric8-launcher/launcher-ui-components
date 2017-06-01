import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Config } from "./config.component";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class TokenService {
  private apiUrl: string = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
  private tokens: string[] = ["openshift", "github"];
  private _inValidTokens: string[] = [];
  private authToken: string;

  constructor(private config: Config, private keycloak: KeycloakService, private http: Http) {
    if (!this.apiUrl) {
      this.apiUrl = config.get("mission_control_url");
    }
    if (this.apiUrl && this.apiUrl.endsWith("/")) {
      this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length - 1);
    }

    // TODO fix this
    this.apiUrl = this.apiUrl.replace(/wss?/, "http") + "/api/validate/token/";

    keycloak.onLogin.subscribe(authToken => {
      this.authToken = authToken;
      let promises: Promise<string>[] = [];
      this.tokens.forEach(token => {
        let options = new RequestOptions({headers: new Headers({"Authorization": `Bearer ${authToken}`})});
        promises.push(this.http.head(this.apiUrl + token, options).toPromise().then(() => "").catch(() => token));
      });

      Promise.all(promises).then(tokens => this._inValidTokens = tokens.filter(token => token !== ""));
    });
  }

  get valid(): boolean {
    console.log(this._inValidTokens);
    return this._inValidTokens.length == 0;
  }

  get inValidTokens(): string[] {
    return this._inValidTokens;
  }
}