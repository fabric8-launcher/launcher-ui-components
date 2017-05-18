import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Gui } from "../../../shared/model";
import { InputComponent } from "../../components/input/input.component";
import { animation } from "../animation";

@Component({
  selector: "generic",
  templateUrl: "generic.page.html",
  animations: animation.animations,
  host: animation.host
})
export class GenericPage extends InputComponent {
  @Input() gui: Gui;
  @Input() validation: Promise<boolean>;
  @Output() validate = new EventEmitter();

  modelChanged() {
    this.validate.emit();
  }

}

