import '@patternfly/react-core/dist/styles/base.css';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { FormPanel } from '../../core/form-panel/form-panel';
import { DependenciesPicker, DependencyItem } from '../dependencies-picker';

const deps = [
  {
    "id": "io.quarkus:quarkus-arc",
    "description": "Build time CDI dependency injection",
    "name": "ArC",
    "metadata": { "category": "Core" }
  },
  {
    "name": "Netty",
    "description": "Netty is a non-blocking I/O client-server framework. Used by Quarkus as foundation layer.",
    "id": "io.quarkus:quarkus-netty",
    "metadata": { "category": "Web" }
  },
  {
    "name": "RESTEasy JAX-RS",
    "description": "REST framework implementing JAX-RS and more",
    "id": "io.quarkus:quarkus-resteasy",
    "metadata": { "category": "Web" }
  },
  {
    "name": "RESTEasy JSON-B",
    "description": "JSON serialization support for RESTEasy",
    "id": "io.quarkus:quarkus-resteasy-jsonb",
    "metadata": { "category": "Web" }
  },
  {
    "name": "SmallRye JWT",
    "description": "Secure your applications with JSON Web Token",
    "id": "io.quarkus:quarkus-smallrye-jwt",
    "metadata": { "category": "Web" }
  },
  {
    "name": "SmallRye OpenAPI",
    "description": "Document your REST APIs with OpenAPI - comes with Swagger UI",
    "id": "io.quarkus:quarkus-smallrye-openapi",
    "metadata": { "category": "Web" }
  },
  {
    "name": "SmallRye REST Client",
    "description": "Call REST services",
    "id": "io.quarkus:quarkus-smallrye-rest-client",
    "metadata": { "category": "Web" }
  },
  {
    "name": "Undertow Servlet",
    "description": "Support for servlets",
    "id": "io.quarkus:quarkus-undertow",
    "metadata": { "category": "Web" }
  },
  {
    "name": "Undertow WebSockets",
    "description": "WebSocket support",
    "id": "io.quarkus:quarkus-undertow-websockets",
    "metadata": { "category": "Web" }
  },
  {
    "name": "Hibernate Validator",
    "description": "Validate data coming to your REST endpoints",
    "id": "io.quarkus:quarkus-hibernate-validator",
    "metadata": { "category": "Web" }
  },
  {
    "name": "JDBC Driver - H2",
    "description": "H2 database connector",
    "id": "io.quarkus:quarkus-jdbc-h2",
    "metadata": { "category": "Data" }
  },
  {
    "name": "JDBC Driver - MariaDB",
    "description": "MariaDB database connector",
    "id": "io.quarkus:quarkus-jdbc-mariadb",
    "metadata": { "category": "Data" }
  },
  {
    "name": "JDBC Driver - PostgreSQL",
    "description": "PostgreSQL database connector",
    "id": "io.quarkus:quarkus-jdbc-postgresql",
    "metadata": { "category": "Data" }
  },
  {
    "name": "JDBC Driver - Microsoft SQL Server",
    "description": "Microsoft SQL Server database connector",
    "id": "io.quarkus:quarkus-jdbc-mssql",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Hibernate ORM",
    "description": "Define your persistent model with Hibernate ORM and JPA",
    "id": "io.quarkus:quarkus-hibernate-orm",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Hibernate ORM with Panache",
    "description": "Define your persistent model in Hibernate ORM with Panache",
    "id": "io.quarkus:quarkus-hibernate-orm-panache",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Hibernate Validator",
    "description": "Validate your persistent model",
    "id": "io.quarkus:quarkus-hibernate-validator",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Hibernate Search + Elasticsearch",
    "description": "Automatically index your Hibernate entities in Elasticsearch",
    "id": "io.quarkus:quarkus-hibernate-search-elasticsearch",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Flyway",
    "description": "Handle your database schema migrations",
    "id": "io.quarkus:quarkus-flyway",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Infinispan Client",
    "description": "Connect to the Infinispan data grid for distributed caching",
    "id": "io.quarkus:quarkus-infinispan-client",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Agroal - Database connection pool",
    "description": "Pool your database connections (included in Hibernate ORM)",
    "id": "io.quarkus:quarkus-agroal",
    "metadata": { "category": "Data" }
  },
  {
    "name": "Narayana JTA - Transaction manager",
    "description": "JTA transaction support (included in Hibernate ORM)",
    "id": "io.quarkus:quarkus-narayana-jta",
    "metadata": { "category": "Data" }
  },
  {
    "name": "SmallRye Reactive Messaging",
    "description": "Asynchronous messaging for Reactive Streams",
    "id": "io.quarkus:quarkus-smallrye-reactive-messaging",
    "metadata": { "category": "Messaging" }
  }
];

storiesOf('Pickers', module)
  .add('DependenciesPicker', () => {
    return (
      <FormPanel
        initialValue={{}}
        validator={DependenciesPicker.checkCompletion}
        onSave={action('save')}
        onCancel={action('cancel')}
      >
        {
          (inputProps) => (<DependenciesPicker.Element {...inputProps} items={deps as DependencyItem[]} placeholder="cat1, cat2, ..." />)}
      </FormPanel>
    )
  });