import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ForgeService} from "ngx-forge";
import {Gui, Message} from "ngx-forge";
import {History} from "ngx-forge";
import {KeycloakService} from "../shared/keycloak.service";
import {TokenService} from "../shared/token.service";
import {Subscription} from "rxjs";

@Component({
  selector: "wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"]
})
export class FormComponent {
}