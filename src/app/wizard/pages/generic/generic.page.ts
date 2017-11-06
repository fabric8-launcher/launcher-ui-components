import {Component, Input, Output, EventEmitter, ElementRef, Renderer2} from "@angular/core";
import { Gui, InputComponent } from "ngx-forge";

@Component({
  selector: "generic",
  templateUrl: "generic.page.html"
})
export class GenericPage extends InputComponent {
  @Input() gui: Gui;
  @Input() validation: Promise<boolean>;
  @Output() validate = new EventEmitter();

  constructor(_renderer: Renderer2, _elementRef: ElementRef, _compositionMode: boolean,) {
    super(_renderer, _elementRef, _compositionMode);
  }

  modelChanged(value: any) {
    this.validate.emit();
  }

}

