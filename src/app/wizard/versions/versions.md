# Release Notes

## Overview

Obsidian Toaster defines and implements an opinionated approach to creating and running polyglot applications optimized for a common set of services running on OpenShift.

## What's New in Alpha 2

__WildFly Swarm__
Adds WildFly Swarm (version 2017.1.1) as a language runtime.

**Eclipse Vert.x**
Updates Vert.x to 3.4.0.Beta1.

**OpenShift Integration**
Adds OpenShift ConfigMap integration to Spring Boot, Vert.x, and WildFly Swarm.

**Obsidian Toaster Generator**
Generator adds WildFly Swarm as a project type.

**Adds the following QuickStarts:**
* Vert.x
  - Secured REST Endpoint
  - ConfigMap
* WildFly Swarm
  - REST Endpoint
  - Secured REST Endpoint
  - ConfigMap
* Spring Boot
  - ConfigMap

## Feature Overview

### Spring Boot - REST Quickstart

A quickstart that exposes a RESTful "Greeting" endpoint using Spring Boot.
Generate a quickstart project that is downloaded as a zip file, can be customized (project name, version & top level package), and is easily deployed to OpenShift using a maven plugin.

### Spring Boot - Secured REST Endpoint Quickstart

A quickstart that exposes a RESTful "Greeting" endpoint which is secured by the Red Hat Single Sign On Platform.
A JWT token will be issued by the Red Hat SSO platform in order to allow a client application to access the Secured REST endpoint.

### Spring Boot - ConfigMap Quickstart
Quickstart to expose a REST Greeting endpoint using Spring Boot where the message is defined as a Kubernetes Config Map property

### Spring Boot Starter

Generate a custom Spring Boot project template by selecting from a list of available Spring dependencies.
The project template includes a simple HTTP Server that can be easily deployed to OpenShift using a maven plugin.

### Eclipse Vert.x - REST Quickstart

A quickstart that exposes a RESTful "Greeting" endpoint using Eclipse Vert.x.
Generate a quickstart project that is downloaded as a zip file, can be customized (project name, version & top level package), and is easily deployed on OpenShift using a maven plugin.

### Eclipse Vert.x - Secured REST Endpoint Quickstart
Expose a REST Greeting endpoint using Eclipse Vert.x & Secured by Red Hat SSO


### Eclipse Vert.x - ConfigMap Quickstart
Simple REST endpoint where the Vert.x container uses kubernetes ConfigMap to get the Application parameters from a configuration file mounted.

### Eclipse Vert.x Starter
Generate a custom Vert.x project template by selecting from a list of available Vert.x modules.
The project template includes a simple HTTP Server that can be easily deployed to OpenShift using a maven plugin.

### WildFly Swarm - REST Quickstart
Expose a REST Greeting endpoint using Eclipse Vert.x

### WildFly Swarm - Secured REST Endpoint Quickstart
Expose a REST Greeting endpoint using Wildfly Swarm & Secured by Red Hat SSO

### WildFly Swarm - ConfigMap Quickstart
A quickstart that demonstrates how to use an Openshift configmap to configure a Swarm service

### WildFly Swarm Starter
Generate a custom WildFly Swarm project template by selecting from a list of available WildFly Swarm modules. The project template includes a simple HTTP Server that can be easily deployed to OpenShift using a maven plugin.

## Component Versions

| Name | Version | Description |
| --- | --- | --- |
| Obsidian Toaster | 1.0.0.alpha2 | Code Generator & Wizard Tool to generate a quickstart or custom Spring Boot / Vert.x starter project ready to be built and deployed to OpenShift Online |
| Spring Boot | 1.4.1.RELEASE | Spring Boot makes it easy to create stand-alone, production-grade Spring applications that you can "just run". http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/ |
| JWS Tomcat 8 | 8.0.36 | Utilized in Spring Boot quickstarts |
| Fabric8 Spring Cloud | 0.1.4 | Utilized in Spring Boot quickstarts |
| Eclipse Vert.x | 3.4.0.Beta1 | Asynchronous / Reactive application platform for the modern web https://projects.eclipse.org/projects/rt.vertx/releases/3.3.0 |
| WildFly Swarm | 2017.2.0 | Rightsize your Enterprise Java services
| Fabric8 Maven Plugin | 3.1.92 | Maven tool to generate the Docker Image, OpenShift files and deploy/undeploy application top of Kubernetes/OpenShift. https://maven.fabric8.io/ |
| Openshift Client - oc | 3.3.x | Client which exposes commands to log on to OpenShift Online/Dedicated/ContainerPlatform and to to manage your containerized applications running in OpenShift. https://docs.openshift.com/enterprise/3.2/cli_reference/get_started_cli.html |
| Red Hat SSO | 7.0 | The Red Hat Single Sign-On Server, based on the Keycloak project, enables you to secure your web applications by providing Web SSO capabilities based on popular standards such as SAML 2.0, OpenID Connect, and OAuth 2.0. https://access.redhat.com/documentation/en/red-hat-single-sign-on/?version=7.0 |

<br/>
<div class="col-sm-offset-2" style="margin-bottom:20px">
    <a class="btn btn-default" href="javascript:history.back()">
        <span class="i fa fa-angle-left"></span>
        Back
    </a>
</div>
