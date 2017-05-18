import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import { animation } from "../animation";

@Component({
  selector: "runtime",
  templateUrl: "runtime.page.html",
  animations: animation.animations,
  host: animation.host
})
export class RuntimePage {
  @Input() gui: Gui;
}

