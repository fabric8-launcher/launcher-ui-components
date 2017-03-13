import { ComponentFixture, TestBed, async, fakeAsync, inject } from '@angular/core/testing';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { newEvent, click, advance } from '.';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MultiselectListModule } from '../app/shared/multiselect-list';
import { ProjectSelectModule } from '../app/shared/project-select';
import { FormComponent } from '../app/wizard/wizard.component';
import { DeployComponent } from '../app/wizard/deploy/deploy.component';
import { ForgeService } from '../app/shared/forge.service';
import { Config } from '../app/shared/config.component';
import { Gui } from '../app/shared/model';


let comp: FormComponent;
let fixture: ComponentFixture<FormComponent>;

let forgeServiceStub: ForgeService;
let spy: any;

const baseJson: any = {
  "metadata": {
    "deprecated": false,
    "category": "Project/Generation",
    "name": "Project: New",
    "description": "Createanewproject"
  },
  "state": {
    "valid": false,
    "canExecute": true,
    "wizard": true,
    "canMoveToNextStep": false,
    "canMoveToPreviousStep": false,
    "steps": [""]
  }
};

const typeText = {
  "inputs": [
    {
      "name": "text",
      "shortName": " ",
      "valueType": "java.lang.String",
      "inputType": "org.jboss.forge.inputType.DEFAULT",
      "enabled": true,
      "required": true,
      "deprecated": false,
      "label": "name",
      "class": "UIInput"
    }]
};

const typeNumber = {
  "inputs": [
    {
      "name": "number",
      "shortName": " ",
      "valueType": "java.lang.Integer",
      "inputType": "org.jboss.forge.inputType.DEFAULT",
      "enabled": true,
      "required": true,
      "deprecated": false,
      "label": "name",
      "class": "UIInput"
    }]
};

describe('Dynamic form should be created for json that comes from the server', () => {
  let subscribe: Function = null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MultiselectListModule, ProjectSelectModule, HttpModule],
      declarations: [FormComponent, DeployComponent],
      providers: [
        ForgeService,
        { provide: Config, useValue: { get: (key: string) => { } } },
        {
          provide: ActivatedRoute, useValue: {
            params: {
              subscribe: ((callback: Function) => {
                this.subscribe = callback;
                callback({ command: 'obsidian-new-quickstart', step: '0' });
              })
            }
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => {
              this.subscribe({ command: 'obsidian-new-quickstart', step: 'end' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    forgeServiceStub = fixture.debugElement.injector.get(ForgeService);

    comp = fixture.componentInstance;

  }));

  it("should create a input type text for specified json", (done: DoneFn) => {
    fakeAsync(() => {
      baseJson.inputs = typeText.inputs;
      spyOn(forgeServiceStub, 'commandInfo').and.returnValue(Promise.resolve(baseJson));

      fixture.detectChanges();
      advance(fixture);
      expect(comp.currentGui == null).toBe(false);
      expect(comp.currentGui.inputs == null).toBe(false);
      expect(comp.currentGui.inputs.length).toBe(1);

      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(input.getAttribute('type')).toBe('text');

      expect(forgeServiceStub.commandInfo).toHaveBeenCalledWith('obsidian-new-quickstart');
    });
    done();
  });

  it("should create a type number for specified json", (done: DoneFn) => {
    fakeAsync(() => {
      baseJson.inputs = typeNumber.inputs;
      spyOn(forgeServiceStub, 'commandInfo').and.returnValue(Promise.resolve(baseJson));

      fixture.detectChanges();
      advance(fixture);

      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(input.getAttribute('type')).toBe('number');
    });
    done();
  });
});