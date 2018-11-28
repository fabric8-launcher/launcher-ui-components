import * as _ from 'lodash';

import { Booster, BoosterVersion } from 'ngx-launcher';
import { EmptyReason } from './mission-runtime-step.component';

export class ViewMission {
  public id: string;
  public advanced: boolean;
  public suggested: boolean;
  public disabled: boolean;
  public disabledReason?: EmptyReason;
  public prerequisite: boolean;
  public community: boolean;
  public showMore: boolean = false;
  public shrinked: boolean = false;
  public boosters: Booster[];
}

export class ViewRuntime {
  public id: string;
  public disabled: boolean;
  public disabledReason?: EmptyReason;
  public prerequisite: boolean;
  public suggested: boolean;
  public pipelinePlatform: string;
  public selectedVersion: { id: string; name: string; };
  public versions: BoosterVersion[];
  public showMore: boolean = false;
  public boosters: Booster[];
}

export function createViewMissions(boosters: Booster[]): ViewMission[] {
  const groupedByMission = _.groupBy(boosters, (b) => b.mission.id);
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

export function createViewRuntimes(boosters: Booster[]): ViewRuntime[] {
  const groupedByRuntime = _.groupBy(boosters, (b) => b.runtime.id);
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
