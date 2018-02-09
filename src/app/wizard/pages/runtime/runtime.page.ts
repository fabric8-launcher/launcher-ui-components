import { Component, Input } from "@angular/core";
import { Gui, ProjectSelectConfig } from "ngx-forge";

@Component({
  selector: "runtime",
  templateUrl: "runtime.page.html"
})
export class RuntimePage {
  @Input() gui: Gui;
  config: ProjectSelectConfig = {
    classes: ['Node','Spring','WildFly','Vert', 'Fuse'],
    techPreview: ['Fuse'],
    renderType: 'title'
  }
}

