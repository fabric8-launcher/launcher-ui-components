import { Injectable } from '@angular/core';

@Injectable()
export class ForgeService {
  LanguageRuntimes: string[] = ['Vertx', 'Wildfly', 'Swarm', 'Spring Boot', 'EAP', 'JWS'];
  ListOfFeatures: string[] = ['Red Hat SSO', 'EFK', 'Metrics', 'Messaging']
}
