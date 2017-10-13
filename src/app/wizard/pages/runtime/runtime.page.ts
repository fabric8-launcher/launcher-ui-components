import { Component, Input } from "@angular/core";
import { Gui, ProjectSelectConfig } from "ngx-forge";

@Component({
  selector: "runtime",
  templateUrl: "runtime.page.html",
  styleUrls: ["runtime.page.scss"]
})
export class RuntimePage {
  @Input() gui: Gui;
  config: ProjectSelectConfig = {
    classes: ['Node','Spring','WildFly','Eclipse'],
    techPreview: ['Node'],
    renderType: 'title'
  }
}

