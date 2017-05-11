import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: "deployment",
  templateUrl: "deployment.page.html",
  styleUrls: ["deployment.page.scss"]
})
export class DeploymentTypePage extends ButtonComponent {
  @Input() gui: Gui;
}

