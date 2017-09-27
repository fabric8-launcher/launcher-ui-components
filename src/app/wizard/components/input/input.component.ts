import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {Input as ForgeInput, Message} from "../../../shared/model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IMultiSelectSettings} from "angular-2-dropdown-multiselect/src/multiselect-dropdown";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "la-input",
  templateUrl: "input.component.html",
  styleUrls: ["input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input("ngModel") input: ForgeInput;
  @Input() messages: Message[];
  @Input() changeOnKey: boolean;
  onModelChange: Function = (_: any) => {
  };
  onModelTouched: Function = () => {
  };

  protected keyUp = new Subject<string>();

  ngOnInit() {
    if (this.changeOnKey) {
      this.keyUp.debounceTime(1000).distinctUntilChanged()
        .flatMap((search) => {
          return Observable.of(search).delay(500);
        }).subscribe((data) => {
        this.onModelChange(data);
      });
    }
  }

  searchMultiSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: "glyphicon",
    showUncheckAll: true
  };

  writeValue(obj: ForgeInput): void {
    if (obj && obj.value) {
      this.input.value = obj.value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  change() {
    if (!this.changeOnKey) {
      this.onModelChange(this.input.value);
    }
  }

  messageForInput(name: string): Message {
    let result: Message;
    if (!this.messages) return null;
    for (let message of this.messages) {
      if (message.input === name) {
        result = message;
      }
    }
    return result;
  }

  convertToOptions(options: string[]): any[] {
    let result: any[] = [];
    for (let option of options) {
      result.push({id: option, name: option});
    }
    return result;
  }
}

