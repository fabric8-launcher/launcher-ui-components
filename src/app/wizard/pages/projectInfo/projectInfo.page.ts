import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { GenericPage } from "../generic/generic.page";
import { FormControl, NgForm } from "@angular/forms";

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: "projectInfo",
  templateUrl: "projectInfo.page.html"
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

