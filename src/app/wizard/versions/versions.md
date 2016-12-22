# Release Notes

## Overview

Obsidian Toaster is a code Generator & wizard tool to generate Quickstart or Spring Boot / Vert.x starter project ready to be build/deployed in OpenShift.

## Feature Overview

### Spring Boot - REST Quickstart

This Quickstart exposes using Spring technology a REST Greeting endpoint. The project that you download as a zip file from the Obsidian Web site can be customized (project name, version & top level package)

### Eclipse Vert.x - REST Quickstart

This Quickstart exposes using Eclipse Vert.x technology a REST Greeting endpoint. The project that you download as a zip file from the Obsidian Web site can be customized (project name, version & top level package)


### Secured Spring Boot REST endpoint using Red Hat SSO

This Quickstart exposes using Spring technology a REST Greeting endpoint which is secured by the Red Hat Single Sign On Platform. A JWT token will be issued by the Red Hat SSO platform in order to allow Client / application to access the Secured REST endpoint.

### Spring Boot Starter

Using the Obsidian Front Web server, you can select a Spring Boot Starter, next the Spring dependencies that you would like to use and a zipped project will be populated. This starter project is ready to start the maven build process and deploy the application in OpenShift. It contains a simple HTTP Server.

### Eclipse Vert.X Starter

Using the Obsidian Front Web server, you can select an Eclipse Vert.x Starter, next the Vert.x midules that you would like to use and a zipped project will be populated. This starter project is ready to start the maven build process and deploy the application in OpenShift. It contains a simple HTTP Server.



## Component Versions

| Name | Version | Description |
| --- | --- | --- |
| Obsidian | 1.0.0.alpha1 | Code Generator & Wizard Tool to generate Quickstart or Spring Boot / Vert.x starter project ready to be build/deployed in OpenShift Online |
| Spring Boot | 1.4.1.RELEASE | Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/ |
| Eclipse Vert.x | 3.3.3 | Asynchronous / Reactive application platform for the modern web. https://projects.eclipse.org/projects/rt.vertx/releases/3.3.0 |
| Fabric8 Maven Plugin | 3.1.92 | Maven tool to generate the Docker Image, Openshift files and deploy/undeploy application top of Kubernetes/OpenShift. https://maven.fabric8.io/ |
| Openshift Client - oc | 3.3.x | Client which exposes commands to log on to OpenShift Online/Dedicated/ContainerPlatform and to to manage your containerized applications running in OpenShift. https://docs.openshift.com/enterprise/3.2/cli_reference/get_started_cli.html |
| Red Hat SSO | 7.0 | The Red Hat Single Sign-On Server, based on the Keycloak project, enables you to secure your web applications by providing Web SSO capabilities based on popular standards such as SAML 2.0, OpenID Connect, and OAuth 2.0. https://access.redhat.com/documentation/en/red-hat-single-sign-on/?version=7.0 |

