import { Component, Input, forwardRef } from '@angular/core';
import { Gui, Input as ForgeInput, Message } from "../shared/model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'la-input',
  template: `
<label class="col-sm-2 control-label" for="textInput-markup">{{input.label}}</label>
<div class="col-sm-10" [ngSwitch]="input.class">
  <span *ngSwitchCase="'UIInput'">
    <span [ngSwitch]="input.valueType">
      <input [attr.id]="input.name" *ngSwitchCase="'java.lang.String'" type="text" name="{{input.name}}" [(ngModel)]="input.value" class="form-control"
        [required]="input.required" [disabled]="!input.enabled" [title]="input.description" (change)="change()">
      <input [attr.id]="input.name" *ngSwitchCase="'java.lang.Boolean'" type="checkbox" name="{{input.name}}" [(ngModel)]="input.value" class="form-control"
        [required]="input.required" [disabled]="!input.enabled" [title]="input.description" (change)="change()">
      <input [attr.id]="input.name" *ngSwitchCase="'java.lang.Integer'" type="number" name="{{input.name}}" [(ngModel)]="input.value" class="form-control"
        [required]="input.required" [disabled]="!input.enabled" [title]="input.description" (change)="change()">
      <div class="errorLabel help-block">
        <span *ngIf="messageForInput(input.name)">{{messageForInput(input.name).description}}</span>
        <span *ngIf="input.name.errors && (input.name.dirty || input.name.touched)">{{input.label}} is required</span>
      </div>
      <span *ngIf="input.note"><span class="fa fa-info-circle"></span> <i>{{input.note}}</i></span>
    </span>
  </span>
  <span *ngSwitchCase="'UISelectOne'">
    <span *ngIf="input.inputType == 'org.jboss.forge.inputType.RADIO'">
    <div class="row" *ngFor="let option of input.valueChoices">
      <span>
        <label>
          <input [name]="input.name" type="radio" [(ngModel)]="input.value" [value]="option.id" (ngModelChange)="change()">
            {{option.id}}
          </label>
      </span>
    </div>
    </span>
    <span *ngIf="input.inputType == 'org.jboss.forge.inputType.DEFAULT'">
    <select [attr.id]="input.name" class="form-control" [(ngModel)]="input.value" name="{{input.name}}" [title]="input.description" (change)="change()">
      <option value="{{option.id}}" *ngFor="let option of input.valueChoices">
          {{option.id}}
      </option>
    </select>
    </span>
  </span>
  <span *ngSwitchCase="'UISelectMany'">
    <ss-multiselect-dropdown [options]="convertToOptions(input.valueChoices)" [(ngModel)]="input.value" name="{{input.name}}" [settings]="searchMultiSelectSettings"></ss-multiselect-dropdown>
  </span>
</div>
  `,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input("ngModel") input: ForgeInput;
  @Input() messages: Message[];
  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  searchMultiSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    showUncheckAll: true
  }

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
    this.onModelChange(this.input.value);
  }

  messageForInput(name: string): Message {
    let result: Message;
    if (!this.messages) return null;
    for (let message of this.messages) {
      if (message.input == name) {
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

