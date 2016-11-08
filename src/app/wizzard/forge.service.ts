import { Injectable } from '@angular/core';

@Injectable()
export class ForgeService {
  executeAction(): Object {
    return {
      "metadata": {
        "deprecated": false,
        "category": "Project/Generation",
        "name": "Project: New",
        "description": "Createanewproject"
      }, "state": {
        "valid": false, "canExecute": false, "wizard": true, "canMoveToNextStep": false, "canMoveToPreviousStep": false
      },
      "inputs": [
        {
          "name": "named",
          "shortName": " ",
          "valueType": "java.lang.String",
          "inputType": "org.jboss.forge.inputType.DEFAULT", "enabled": true, "required": true, "deprecated": false, "label": "Projectname", "class": "UIInput"
        },
        {
          "name": "topLevelPackage",
          "shortName": " ",
          "valueType": "java.lang.String",
          "inputType": "org.jboss.forge.inputType.DEFAULT", "enabled": true, "required": false, "deprecated": false, "label": "Toplevelpackage", "class": "UIInput", "value": "org.example"
        }, {
          "name": "version", "shortName": "", "valueType": "java.lang.String", "inputType": "org.jboss.forge.inputType.DEFAULT", "enabled": true, "required": false, "deprecated": false,
          "label": "Version",
          "class": "UIInput",
          "value": "1.0.0-SNAPSHOT"
        },
        {
          "name": "finalName",
          "shortName": " ",
          "valueType": "java.lang.String",
          "inputType": "org.jboss.forge.inputType.DEFAULT",
          "enabled": true,
          "required": false,
          "deprecated": false,
          "label": "Final name",
          "class": "UIInput"
        },
        {
          "name": "targetLocation",
          "shortName": " ",
          "valueType": "org.jboss.forge.addon.resource.DirectoryResource",
          "inputType": "org.jboss.forge.inputType.DIRECTORY_PICKER", "enabled": true, "required": false, "deprecated": false, "label": "Projectlocation", "class": "UIInput",
          "value": "/tmp/workspace"
        },
        {
          "name": "overwrite",
          "shortName": " ",
          "valueType": "java.lang.Boolean",
          "inputType": "org.jboss.forge.inputType.DEFAULT",
          "enabled": false,
          "required": false,
          "deprecated": false,
          "label": "Overwrite existing project location",
          "class": "UIInput",
          "value": "false"
        },
        {
          "name": "type",
          "shortName": " ",
          "valueType": "org.jboss.forge.addon.projects.ProjectType",
          "inputType": "org.jboss.forge.inputType.DEFAULT", "enabled": true, "required": true, "deprecated": false, "label": "Projecttype", "valueChoices": ["JavaWebApplication(WAR)", "WildFlySwarmMicroservice(WAR+JAR)", "JavaLibrary(JAR)", "Parent", "ForgeAddon(JAR)", "JavaResources(JAR)", "JavaEnterpriseArchive(EAR)", "FromArchetype", "Generic"], "class": "UISelectOne",
          "value": "Java Web Application (WAR)"
        },
        {
          "name": "buildSystem",
          "shortName": " ",
          "valueType": "org.jboss.forge.addon.projects.ProjectProvider",
          "inputType": "org.jboss.forge.inputType.DEFAULT",
          "enabled": true,
          "required": true,
          "deprecated": false,
          "label": "Build system",
          "valueChoices": [
            "Maven"
          ],
          "class": "UISelectOne",
          "value": "Maven"
        },
        {
          "name": "stack",
          "shortName": " ",
          "valueType": "org.jboss.forge.addon.projects.stacks.StackFacet", "inputType": "org.jboss.forge.inputType.DEFAULT", "enabled": true, "required": false, "deprecated": false,
          "label": "Stack",
          "description": "The technology stack to be used in this project",
          "valueChoices": [
            "Java EE 7",
            "Java EE 6",
            "None"
          ],
          "class": "UISelectOne",
          "value": "None"
        }
      ]
    };
  }
}
