import React from 'react';
import * as _ from 'lodash';
import { Example, ExampleMission } from 'launcher-client';
import { useLauncherClient } from '../../launcher-client-context';
import { DataLoader } from '../../core/data-loader/data-loader';

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

export function ExamplesLoader(props: {children: (missions: ExampleMission[]) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.exampleCatalog().then(examples => {
    return createMissions(examples);
  });
  return (
    <DataLoader loader={itemsLoader} default={[]} >
      {props.children}
    </DataLoader>
  );
}
