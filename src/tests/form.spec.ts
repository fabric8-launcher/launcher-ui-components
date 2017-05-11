import { ComponentFixture, TestBed, async, fakeAsync, inject, discardPeriodicTasks, flushMicrotasks } from '@angular/core/testing';
import { advance } from '.';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectSelectModule } from '../app/wizard/components/project-select/project-select';
import { FormComponent } from '../app/wizard/wizard.component';
import { DeployPage } from '../app/wizard/pages/deploy/deploy.page';
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

const typeSelect = {
  "inputs": [
    {
      "name": "type",
      "shortName": " ",
      "valueType": "io.openshiftio.generator.catalog.Quickstart",
      "inputType": "org.jboss.forge.inputType.DEFAULT",
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
  let subscribe: Function = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ProjectSelectModule, HttpModule],
      declarations: [FormComponent, DeployPage],
      providers: [
        ForgeService,
        { provide: Config, useValue: { get: (key: string) => { } } },
        {
          provide: ActivatedRoute, useValue: {
            params: {
              subscribe: ((callback: Function) => {
                this.subscribe = callback;
                callback({ command: 'lauchpad-new-quickstart', step: '0' });
              })
            }
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => {
              this.subscribe({ command: 'lauchpad-new-quickstart', step: 'end' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    forgeServiceStub = fixture.debugElement.injector.get(ForgeService);

    comp = fixture.componentInstance;
  });

  it("should create a input type text for specified json", fakeAsync(() => {
    setupUI(typeText);

    expect(comp.currentGui == null).toBe(false);
    expect(comp.currentGui.inputs == null).toBe(false);
    expect(comp.currentGui.inputs.length).toBe(1);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('text');

    expect(forgeServiceStub.commandInfo).toHaveBeenCalledWith('lauchpad-new-quickstart');

    cleanTimers();
  }));

  it("should create a type number for specified json", fakeAsync(() => {
    setupUI(typeNumber);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('number');

    cleanTimers();
  }));

  it("should create a type radio for specified json", fakeAsync(() => {
    setupUI(typeSelect);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('radio');

    cleanTimers();
  }));

  function setupUI(obj: any) {
    let json = Object.assign(baseJson, obj);
    spyOn(forgeServiceStub, 'commandInfo').and.returnValue(Promise.resolve(json));
    fixture.detectChanges();
    advance(fixture);
  }

  function cleanTimers() {
    flushMicrotasks();
    discardPeriodicTasks();
  }
});