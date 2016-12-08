import { NgModule, Component, Pipe, OnInit, DoCheck, HostListener, Input, ElementRef, Output, EventEmitter, forwardRef, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Input as Field, Option } from '../wizard/model';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiselectList),
  multi: true
};

@Pipe({
  name: 'searchFilter'
})
export class MultiSelectSearchFilter {
  transform(options: Array<Option>, args: any): Array<Option> {
    return options.filter((option: Option) => option[args.field].toLowerCase().indexOf((args.text || '').toLowerCase()) > -1);
  }
}

@Component({
  selector: 'ob-multiselect-list',
  providers: [MULTISELECT_VALUE_ACCESSOR],
  styles: [`
        a { outline: none !important; }
    `],
  template: `
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn btn-default dropdown-toggle" (click)="toggleDropdown()">{{searchField[0].toUpperCase() + searchField.substring(1)}} <span class="caret"></span></button>
            <ul class="dropdown-menu" style="display:block" *ngIf="isVisible">
              <li [class.selected]="searchField == 'name'"><a href="javascript:;" (click)="searchField = 'name'; toggleDropdown()">Name</a></li>
              <li [class.selected]="searchField == 'description'"><a href="javascript:;" (click)="searchField = 'description'; toggleDropdown()">Description</a></li>
            </ul>
          </div>
          <input type="text" class="form-control" id="filter" placeholder="Filter By {{searchField[0].toUpperCase() + searchField.substring(1)}}..." [(ngModel)]="searchFilterText" name="seach{{input.name}}">
            <span class="input-group-addon" *ngIf="searchFilterText.length > 0">
                <span (click)="clearSearch()"><i class="fa fa-times"></i></span>
            </span>
        </div>
        <div class="toolbar-pf-results" style="border:0">
          <ul class="list-inline">
            <li *ngFor="let value of model">
              <span class="label label-info">
                  {{value}}
                  <a href="javascript:;" (click)="setSelected({id:value})"><span class="pficon pficon-close"></span></a>
              </span>
            </li>
          </ul>
        </div>
        <div class="list-group list-view-pf list-view-pf-view">
          <div class="list-group-item" *ngFor="let option of input.valueChoices | searchFilter:{text:searchFilterText, field:searchField}">
            <div class="list-view-pf-checkbox">
              <input type="checkbox" name="{{input.name}}" value="{{option.id}}"
                [checked]="isSelected(option)"
                (change)="setSelected(option)">
            </div>
            <div class="list-view-pf-main-info" (click)="setSelected(option)">
              <div class="list-view-pf-left">
                <span class="fa fa-cogs list-view-pf-icon-sm"></span>
              </div>
              <div class="list-view-pf-body">
                <div class="list-view-pf-description" style="display:block">
                  <div class="list-group-item-heading">
                    {{option.id}}
                  </div>
                  <div class="list-group-item-text" style="width:100%">
                    {{option.description}}
                  </div>
                   <div class="list-view-pf-additional-info">
                    <div class="list-view-pf-additional-info-item" *ngIf="option.stability">
                      <span class="fa fa-industry" *ngIf="option.stability == 'STABLE'"></span>
                      <span class="fa fa-bolt" *ngIf="option.stability == 'UNSTABLE'"></span>
                      <span class="fa fa-flask" *ngIf="option.stability == 'EXPERIMENTAL'"></span>
                      {{option.stability[0] + option.stability.substring(1).toLowerCase()}}
                    </div>
                    <div class="list-view-pf-additional-info-item" *ngIf="option.tags">
                      <span class="fa fa-tags"></span>
                      {{normalize(option.tags)}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
})
export class MultiselectList implements DoCheck, ControlValueAccessor {

  @Input() input: Field;

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };
  differ: any;
  model: string[];
  searchFilterText: string = '';
  searchField: string = 'name';
  isVisible: boolean;

  constructor(
    private element: ElementRef,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
  }

  normalize(name: string): string {
    return name.replace(/,/g, ", ");
  }

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
    let changes = this.differ.diff(this.model);
    if (changes) {
      // this.updateNumSelected();
      // this.updateTitle();
    }
  }

  clearSearch() {
    this.searchFilterText = '';
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
  }

  isSelected(option: Option): boolean {
    return this.model && this.model.indexOf(option.id) > -1;
  }

  setSelected(option: Option) {
    if (!this.model) this.model = [];
    var index = this.model.indexOf(option.id);
    if (index > -1) {
      this.model.splice(index, 1);
    } else {
      this.model.push(option.id);
    }
    this.onModelChange(this.model);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MultiselectList],
  declarations: [MultiselectList, MultiSelectSearchFilter],
})
export class MultiselectListModule { }
