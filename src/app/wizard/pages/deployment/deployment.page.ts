import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";

@Component({
  selector: "deployment",
  templateUrl: "deployment.page.html",
  styleUrls: ["deployment.page.scss"]
})
export class DeploymentTypePage {
  @Input() gui: Gui;
  @Output() action = new EventEmitter();

  next() {
    this.action.emit();
  }  
}

