import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import {ButtonComponent} from "../../components/button/button.component";
import { animation } from "../animation";

@Component({
  selector: "deployment",
  templateUrl: "deployment.page.html",
  styleUrls: ["deployment.page.scss"],
  animations: animation.animations,
  host: animation.host
})
export class DeploymentTypePage extends ButtonComponent {
  @Input() gui: Gui;
}

