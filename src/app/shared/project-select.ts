import { NgModule, Component, Pipe, OnInit, DoCheck, HostListener, Input, ElementRef, Output, EventEmitter, forwardRef, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Input as Field, Option } from '../wizard/model';

const PROJECTSELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectSelect),
  multi: true
};

@Component({
  selector: 'ob-project-select',
  providers: [PROJECTSELECT_VALUE_ACCESSOR],
  templateUrl: './project-select.html',
  styleUrls: ['./project-select.scss']
})
export class ProjectSelect implements DoCheck, ControlValueAccessor {
  @Input() input: Field;

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  model: string;

  writeValue(value: any): void {
    if (value !== undefined) {
      this.model = value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  ngDoCheck() {
  }

  className(option: Option) {
    let index = option.id.indexOf(" ");
    index = index == -1 ? option.id.indexOf(".") : index;
    return option.id.substr(0, index);
  }

  isSelected(option: Option): boolean {
    return this.model == option.id;
  }

  setSelected(option: Option) {
    this.model = option.id;
    this.onModelChange(this.model);
  }

}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ProjectSelect],
  declarations: [ProjectSelect],
})
export class ProjectSelectModule {}
