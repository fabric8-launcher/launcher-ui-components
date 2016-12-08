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
  template: `
    <div class="container-fluid container-cards-pf">
      <div class="row row-cards-pf">
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" *ngFor="let option of input.valueChoices">
          <div class="card-pf card-pf-view card-pf-view-select card-pf-view-single-select"
              [class.active]="isSelected(option)" (click)="setSelected(option)" style="min-height:160px">
            <div class="card-pf-body">
              <div class="card-pf-top-element">
                <span>
                  <img src="src/app/shared/project-select-icons/{{IMAGES[option.id]}}" width="64px" height="46px" style="margin:auto;display:block">
                </span>
              </div>
              <h2 class="card-pf-title text-center">
                {{option.id}}
              </h2>
              <div class="card-pf-view-checkbox">
                <input type="checkbox">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
})
export class ProjectSelect implements DoCheck, ControlValueAccessor {
  DEFAULT_IMAGE = 'java.svg';
  IMAGES: any = {
    'Spring Boot': 'spring-boot-logo.png',
    'WildFly Swarm Microservice (WAR + JAR)': 'wildfly-swarm.png',
    'Vert.x': 'vertx.svg'
  };

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
