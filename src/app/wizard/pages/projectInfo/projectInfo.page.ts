import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { GenericPage } from "../generic/generic.page";
import { FormControl, NgForm } from "@angular/forms";
import { animation } from "../animation";

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: "projectInfo",
  templateUrl: "projectInfo.page.html",
  animations: animation.animations,
  host: animation.host
})
export class ProjectInfoPage extends GenericPage {
  expand: boolean;

  toggle() {
    this.expand = !this.expand;
  }

  getField(fieldName: string): Input {
    return this.gui.inputs.find(i => i.name == fieldName);
  }
}

