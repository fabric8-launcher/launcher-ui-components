import { ComponentFixture, TestBed, async, fakeAsync, inject, discardPeriodicTasks, flushMicrotasks } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericPage } from '../app/wizard/pages/generic/generic.page';
import { InputComponent } from '../app/wizard/components/input/input.component';
import { ButtonComponent } from '../app/wizard/components/button/button.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { Gui } from '../app/shared/model';
import { History } from '../app/wizard/history.component';

let comp: GenericPage;
let fixture: ComponentFixture<GenericPage>;

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

const typeSelect = {
  "inputs": [
    {
      "name": "type",
      "shortName": " ",
      "valueType": "io.openshiftio.generator.catalog.Quickstart",
      "inputType": "org.jboss.forge.inputType.RADIO",
      "enabled": true,
      "required": true,
      "deprecated": false,
      "label": "Project type",
      "description": "Quickstart to expose a REST Greeting endpoint using SpringBoot & Secured by Red Hat SSO",
      "note": "Quickstart to expose a REST Greeting endpoint using SpringBoot & Secured by Red Hat SSO",
      "valueChoices": [
        {
          "id": "Secured Spring Boot Tomcat - Rest & Red Hat SSO",
          "description": "Quickstart to expose a REST Greeting endpoint using SpringBoot & Secured by Red Hat SSO",
          "gitRef": "master",
          "githubRepo": "lauchpad-quickstarts/secured_rest-springboot",
          "metadata": {
            "name": "Secured Spring Boot Tomcat - Rest & Red Hat SSO",
            "description": "Quickstart to expose a REST Greeting endpoint using SpringBoot & Secured by Red Hat SSO"
          },
          "name": "Secured Spring Boot Tomcat - Rest & Red Hat SSO"
        }
      ],
      "class": "UISelectOne",
      "value": "Secured Spring Boot Tomcat - Rest & Red Hat SSO"
    }
  ]
};

describe('Dynamic form should be created for json that comes from the server', () => {
  let historyStub = new History();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MultiselectDropdownModule],
      declarations: [GenericPage, InputComponent, ButtonComponent],
      providers: [ 
        { provide: History, useValue: historyStub },
        {
          provide: ActivatedRoute, useValue: {}
        },
        {
          provide: Router, useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericPage);
    comp = fixture.componentInstance;
  }));

  it("should create a input type text for specified json", (() => {
    setupUI(typeText);

    expect(comp.gui == null).toBe(false);
    expect(comp.gui.inputs == null).toBe(false);
    expect(comp.gui.inputs.length).toBe(1);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('text');
  }));

  it("should create a type number for specified json", fakeAsync(() => {
    setupUI(typeNumber);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('number');
  }));

  it("should create a type radio for specified json", fakeAsync(() => {
    setupUI(typeSelect);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('radio');
  }));

  function setupUI(obj: any) {
    let json = Object.assign(baseJson, obj);
    comp.gui = json;
    fixture.detectChanges();
  }
});