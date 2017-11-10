import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Gui, SubmittableInput, History } from "ngx-forge";

import { ButtonComponent } from "../../components/button/button.component";
import { TokenService } from "../../../shared/token.service";

@Component({
  selector: "deployment",
  templateUrl: "deployment.page.html",
  styleUrls: ["deployment.page.scss"]
})
export class DeploymentTypePage extends ButtonComponent {
  @Input() gui: Gui;

  constructor(history: History, router: Router, route: ActivatedRoute, private token: TokenService) {
    super(history, router, route);
  }

  getField(fieldName: string): SubmittableInput {
    return this.gui.inputs.find(i => i.name === fieldName);
  }

  isZipFile(option : any) {
    return option.id == "ZIP File";
  }

}

