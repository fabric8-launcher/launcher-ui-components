import React from 'react';
import * as _ from 'lodash';
import { Example, ExampleMission, ExampleRuntime } from 'launcher-client';
import { useLauncherClient } from '../launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function createMissions(examples: Example[]): ExampleMission[] {
  const groupedByMission = _.groupBy(examples, (e) => e.mission.id);
  return _.values(groupedByMission).map((missionBoosters) => {
    const mission = _.first(missionBoosters).mission;
    return {
      id: mission.id,
      name: mission.name,
      description: mission.description,
      community: false,
      advanced: _.get(mission, 'metadata.level') === 'advanced' || _.get(mission, 'metadata.prerequisite', false),
      suggested: _.get(mission, 'metadata.suggested', false),
      showMore: false,
      disabled: true,
      boosters: missionBoosters
    };
  });
}

export function createRuntimes(examples: Example[]): ExampleRuntime[] {
  const groupedByRuntime = _.groupBy(examples, (b) => b.runtime.id);
  return _.values(groupedByRuntime).map((runtimeBoosters) => {
    const runtime = _.first(runtimeBoosters).runtime;
    return {
      id: runtime.id,
      name: runtime.name,
      description: runtime.description,
      icon: runtime.icon,
      suggested: _.get(runtime, 'metadata.suggested', false),
      prerequisite: _.get(runtime, 'metadata.prerequisite', false),
      pipelinePlatform: _.get(runtime, 'metadata.pipelinePlatform', false),
      showMore: false,
      disabled: true,
      boosters: runtimeBoosters
    };
  });
}

export function ExampleCatalogLoader(props: {children: (obj: {missions: ExampleMission[], runtimes: ExampleRuntime[]}) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(examples => {
    return {
      missions: createMissions(examples),
      runtimes: createRuntimes(examples)
    };
  });
  return (
    <DataLoader loader={itemsLoader} default={{}} >
      {props.children}
    </DataLoader>
  );
}
