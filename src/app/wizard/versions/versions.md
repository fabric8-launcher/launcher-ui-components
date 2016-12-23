# Release Notes

## Overview

Obsidian Toaster is a cloud application platform that includes a collection of cloud services with language runtime integration running on OpenShift.
This initial release delivers a project generator that creates a quickstart or custom Spring Boot / Vert.x starter project, optionally secured with Red hat SSO, and is ready to be built and deployed to OpenShift.

## Feature Overview

### Spring Boot - REST Quickstart

A quickstart that exposes a RESTful "Greeting" endpoint using Spring Boot.
Generate a quickstart project that is downloaded as a zip file, can be customized (project name, version & top level package), and is easily deployed to OpenShift using a maven plugin.

### Eclipse Vert.x - REST Quickstart

A quickstart that exposes a RESTful "Greeting" endpoint using Eclipse Vert.x.
Generate a quickstart project that is downloaded as a zip file, can be customized (project name, version & top level package), and is easily deployed on OpenShift using a maven plugin.

### Spring Boot REST endpoint secured with Red Hat SSO

A quickstart that exposes a RESTful "Greeting" endpoint which is secured by the Red Hat Single Sign On Platform.
A JWT token will be issued by the Red Hat SSO platform in order to allow a client application to access the Secured REST endpoint.

### Spring Boot Starter

Generate a custom Spring Boot project template by selecting from a list of available Spring dependencies.
The project template includes a simple HTTP Server that can be easily deployed to OpenShift using a maven plugin.

### Eclipse Vert.X Starter

Generate a custom Vert.x project template by selecting from a list of available Vert.x modules.
The project template includes a simple HTTP Server that can be easily deployed to OpenShift using a maven plugin.

## Component Versions

| Name | Version | Description |
| --- | --- | --- |
| Obsidian | 1.0.0.alpha1 | Code Generator & Wizard Tool to generate quickstart or custom Spring Boot / Vert.x starter project ready to be built and deployed to OpenShift Online |
| Spring Boot | 1.4.1.RELEASE | Spring Boot makes it easy to create stand-alone, production-grade Spring applications that you can "just run".
http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/ |
| Eclipse Vert.x | 3.3.3 | Asynchronous / Reactive application platform for the modern web.
https://projects.eclipse.org/projects/rt.vertx/releases/3.3.0 |
| Fabric8 Maven Plugin | 3.1.92 | Maven tool to generate the Docker Image, OpenShift files and deploy/undeploy application top of Kubernetes/OpenShift.
https://maven.fabric8.io/ |
| Openshift Client - oc | 3.3.x | Client which exposes commands to log on to OpenShift Online/Dedicated/ContainerPlatform and to to manage your containerized applications running in OpenShift.
https://docs.openshift.com/enterprise/3.2/cli_reference/get_started_cli.html |
| Red Hat SSO | 7.0 | The Red Hat Single Sign-On Server, based on the Keycloak project, enables you to secure your web applications by providing Web SSO capabilities based on popular standards such as SAML 2.0, OpenID Connect, and OAuth 2.0.
https://access.redhat.com/documentation/en/red-hat-single-sign-on/?version=7.0 |