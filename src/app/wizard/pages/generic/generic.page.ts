import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: "generic",
  templateUrl: "generic.page.html"
})
export class GenericPage extends InputComponent {
  @Input() gui: Gui;
  @Input() validation: Promise<boolean>;
  @Output() validate = new EventEmitter();

  modelChanged(value: any) {
    this.validate.emit();
  }

}

