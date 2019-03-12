import exampleCatalog from '../data-examples/mock-example-catalog.json';

import { Catalog, Example, ExampleMission } from '../types';
import { filter } from './launchers';

describe('Filter examples', () => {
  it('should filter catalog on examples', () => {
    const result = filter({ example: { mission: { name }, runtime: { name }, name } }, exampleCatalog as unknown as Catalog);

    expect(result.length).toBeDefined();
    expect(result[0].name).toBe('Eclipse Vert.x - Istio - Circuit Breaker');
    expect(result[0].description).toBeUndefined();
    expect(((result[0] as Example).mission as ExampleMission).name).toBe('Istio - Circuit Breaker');
    expect(((result[0] as Example).runtime as ExampleMission).name).toBe('Eclipse Vert.x');
  });

  it('should filter catalog on missions', () => {
    const result = filter({ mission: { name: '', runtime: { id: '', icon: '' } } }, exampleCatalog as unknown as Catalog);

    expect(result.length).toBeDefined();
    expect(result[0].name).toBe('CRUD');
    expect(((result[0] as ExampleMission).runtime!.length)).toBe(5);
    expect(((result[0] as ExampleMission).runtime![0]).description).toBeUndefined();
    expect(((result[0] as ExampleMission).runtime![0]).icon).toBeDefined();
  });

  it('should filter catalog on mission id', () => {
    const result = filter({ mission: { id: 'rest-http-secured', name: '' } }, exampleCatalog as unknown as Catalog);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Secured');
    expect((result[0] as ExampleMission).runtime).toBeUndefined();
  });

  it('should filter catalog on mission by missionId and runtimeId', () => {
    const result = filter({ mission: { id: 'crud', name: '', runtime: { id: 'vert.x', icon: '' } } },
      exampleCatalog as unknown as Catalog);

    expect(result.length).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('CRUD');
    expect(((result[0] as ExampleMission).runtime!.length)).toBe(1);
    expect(((result[0] as ExampleMission).runtime![0]).description).toBeUndefined();
  });

  it('should filter catalog on mission and runtime id', () => {
    const result = filter({ mission: { id: '', name: '', runtime: { id: 'vert.x', icon: '' } } },
      exampleCatalog as unknown as Catalog);

    expect(result.length).toBeDefined();
    expect(result.length).toBe(12);
    expect(((result[0] as ExampleMission).runtime!.length)).toBe(1);
    expect(((result[0] as ExampleMission).runtime![0]).description).toBeUndefined();
  });

  it('should filter catalog on runtime', () => {
    const result = filter({ runtime: { name, version: { name } } }, exampleCatalog as unknown as Catalog);

    expect(result.length).toBeDefined();
    expect(result[0].name).toBe('Eclipse Vert.x');
    const versions = (result[0] as any).version;
    expect(versions).toBeDefined();
    expect(versions.length).toBe(2);
    expect(versions[0].name).toBe('3.5.4.redhat-00002 (RHOAR)');
    expect(versions[0].id).toBeUndefined();
  });

  it('should filter catalog on runtime by id', () => {
    const result = filter({ runtime: { id: 'spring-boot', name } }, exampleCatalog as unknown as Catalog);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Spring Boot');
  });

});
