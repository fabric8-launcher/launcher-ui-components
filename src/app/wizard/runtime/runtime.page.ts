import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../shared/model";

@Component({
  selector: "runtime",
  templateUrl: "runtime.page.html"
})
export class RuntimePage {
  @Input() gui: Gui;
}

