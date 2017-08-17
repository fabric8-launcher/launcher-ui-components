import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";

@Component({
  selector: "mission",
  templateUrl: "mission.page.html"
})
export class MissionPage {
  @Input() gui: Gui;
}

