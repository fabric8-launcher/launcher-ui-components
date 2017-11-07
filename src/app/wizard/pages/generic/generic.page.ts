import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Gui, InputComponent, Message } from "ngx-forge";

@Component({
  selector: "generic",
  templateUrl: "generic.page.html"
})
export class GenericPage {
  @Input() gui: Gui;
  @Input() validation: Promise<boolean>;
  @Output() validate = new EventEmitter();

  modelChanged(value: any) {
    this.validate.emit();
  }

  messageForInput(name: string): Message {
    return new InputComponent(null, null, false).messageForInput(name);
  }
}

