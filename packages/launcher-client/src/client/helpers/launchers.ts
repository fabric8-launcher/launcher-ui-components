import * as _ from 'lodash';
import { Enums, FieldProperty, Example, Catalog, ExampleMission, ExampleRuntime } from '../types';

export function fillPropsValuesWithEnums(propsContainer: { props?: FieldProperty[]; }, enums: Enums) {
  if (!propsContainer.props || propsContainer.props.length === 0) {
    return propsContainer;
  }
  const props = propsContainer.props.map(p => {
    return {
      ...fillPropsValuesWithEnums(p, enums),
      values: enums[p.id],
    };
  });
  return {
    ...propsContainer,
    props,
  };
}

export function propsWithValuesMapper(enums: Enums) {
  return (c: { props?: FieldProperty[]; }) => fillPropsValuesWithEnums(c, enums);
}

const relations = ['example', 'mission', 'runtime', 'version'];

function copyProperties(obj: any, props: any, lambda?): any {
  const result = {};
  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      const value = _.get(obj, prop);
      if (relations.indexOf(prop) === -1) {
        result[prop] = value;
      } else {
        result[prop] = lambda(value, obj, prop);
      }
    }
  }
  return result;
}

export function filterExample(query: any, catalog: Catalog): Example[] {
  const missionById = _.keyBy(catalog.missions, 'id');
  const runtimeById = _.keyBy(catalog.runtimes, 'id');

  const result: Example[] = [];
  for (let i = 0; i < catalog.boosters.length; i++) {
    const example = catalog.boosters[i];
    result[i] = copyProperties(example, query,
      (name, obj, relation) =>
        copyProperties(relation === 'mission' ? missionById[name] : runtimeById[name], query[relation]));
  }
  return result;
}

export function filterExampleMission(query: any, catalog: Catalog): ExampleMission[] {
  const runtimeById = _.keyBy(catalog.runtimes, 'id');
  const lambda = (name, obj) =>
    _.uniqBy(filterExamples(catalog.boosters, undefined, obj.id), b => b.runtime).map(
      b => copyProperties(runtimeById[b.runtime as string], query.runtime));

  const result: ExampleMission[] = [];
  if (query.id) {
    return catalog.missions.filter(m => m.id === query.id).map(m => copyProperties(m, query, lambda));
  } else {
    for (let i = 0; i < catalog.missions.length; i++) {
      const mission = catalog.missions[i];
      result[i] = copyProperties(mission, query, lambda);
    }
  }

  return result;
}

export function filterExampleRuntime(query: any, catalog: Catalog): ExampleRuntime[] {
  const runtimeById = _.keyBy(catalog.runtimes, 'id');
  const result: ExampleRuntime[] = [];
  for (let i = 0; i < catalog.runtimes.length; i++) {
    const runtime = catalog.runtimes[i];
    result[i] = copyProperties(runtime, query, (name, obj) => runtimeById[obj.id].versions.map(v => copyProperties(v, query.version)));
  }
  return result;
}

export function filter(query: any, catalog: Catalog): Example[] | ExampleMission[] | ExampleRuntime[] {
  if (query.example) {
    return filterExample(query.example, catalog);
  }

  if (query.mission) {
    return filterExampleMission(query.mission, catalog);
  }

  if (query.runtime) {
    return filterExampleRuntime(query.runtime, catalog);
  }

  return [];
}

export function filterExamples(examples: Example[], cluster?: string, missionId?: string, runtimeId?: string, versionId?: string) {
  const availableExamples = examples.filter(b => {
    return (!missionId || b.mission === missionId)
      && (!runtimeId || b.runtime === runtimeId)
      && (!versionId || b.version === versionId);
  });
  if (availableExamples.length === 0) {
    return [];
  }
  if (!cluster) {
    return availableExamples;
  }
  const examplesRunningOnCluster = availableExamples.filter(b => {
    return checkRunsOnCluster(b, cluster);
  });
  if (examplesRunningOnCluster.length === 0) {
    return [];
  }
  return examplesRunningOnCluster;
}

function checkRunsOnCluster(example: Example, cluster: string) {
  let defaultResult = true;
  let runsOn = _.get(example, 'metadata.app.launcher.runsOn');
  if (typeof runsOn === 'string') {
    runsOn = [runsOn];
  }
  if (runsOn && runsOn.length !== 0) {
    for (const supportedCategory of runsOn) {
      if (!supportedCategory.startsWith('!')) {
        defaultResult = false;
      }
      if (supportedCategory.toLowerCase() === 'all'
        || supportedCategory.toLowerCase() === '*'
        || supportedCategory.toLocaleLowerCase() === cluster) {
        return true;
      } else if (supportedCategory.toLowerCase() === 'none'
        || supportedCategory.toLowerCase() === '!*'
        || supportedCategory.toLowerCase() === ('!' + cluster)) {
        return false;
      }
    }
  }
  return defaultResult;
}
