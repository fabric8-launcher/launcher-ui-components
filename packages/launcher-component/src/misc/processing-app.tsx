import * as React from 'react';

import { DataList, DataListCell, DataListItem } from '@patternfly/react-core';
import { ErrorCircleOIcon, InProgressIcon, OkIcon, PauseCircleIcon } from '@patternfly/react-icons';
import { Spin } from '../core/data-loader/data-loader';

interface EventStatus {
  statusMessage: string;
  data?: {
    location?: string;
    error?: string;
  };
}

interface ProcessingAppProps {
  progressEvents?: Array<{ name: string, message: string }>;
  progressEventsResults?: EventStatus[];
}

function StatusIcon(props: { status: Statuses }) {
  switch (props.status) {
    case 'progress':
      return (<Spin><InProgressIcon/></Spin>);
    case 'paused':
      return (<PauseCircleIcon/>);
    case 'completed':
      return (<OkIcon/>);
    case 'error':
      return (<ErrorCircleOIcon/>);
    default:
      throw new Error(`Invalid status ${status}`);
  }
}

type Statuses = 'progress' | 'completed' | 'error' | 'paused';

export function ProcessingApp(props: ProcessingAppProps) {

  if(!props.progressEvents) {
    return (<Spin><InProgressIcon/></Spin>);
  }

  const progressSteps: Array<{ id: number, name: string, message: string, status: Statuses }> = new Array(4);
  const length = props.progressEvents && props.progressEvents.length || 0;
  const getStatus = (eventName: string) => {
    return props.progressEventsResults && props.progressEventsResults.find(s => s.statusMessage === eventName);
  };
  for (let i = 0; i < length; i++) {
    const step = props.progressEvents![i]!;
    const status = getStatus(step.name);
    progressSteps[i] = {
      id: i,
      name: step.name,
      message: step.message,
      status: status ? (status.data && status.data.error ? 'error' : 'completed') : 'progress',
    };
  }

  const ProgressEvent = ({event}) => (
    <DataListItem aria-labelledby="Progress event" isExpanded={false}>
      <DataListCell width={1}><StatusIcon status={event.status}/></DataListCell>
      <DataListCell width={4}>{event.message}</DataListCell>
    </DataListItem>
  );

  return (
    <DataList aria-label="Progress events">
      {progressSteps.map(s => (<ProgressEvent key={s.id} event={s}/>))}
    </DataList>
  );
}
