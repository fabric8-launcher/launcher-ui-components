import * as React from 'react';
import { Button, Grid, GridItem } from '@patternfly/react-core';
import { EditIcon, WindowCloseIcon } from '@patternfly/react-icons';
import { ReactElement, useContext, useState } from 'react';

import './hub-n-spoke.scss';

export interface HubItem {
  id: string;
  title: string;
  overview: {
    component: ReactElement<any>;
    width?: 'half' | 'full';
  };
  form: {
    component: (props: {close: () => void}) => ReactElement<any>;
  };
}

interface Hub {
  selected?: HubItem;
  open(item: HubItem);
  close();
}

export const HubContext = React.createContext<Hub | undefined>(undefined);

export function HubOverviewCard(props: HubItem) {
  const hub = useContext(HubContext);
  const size = props.overview.width === 'full' ? 12 : 6;
  const onEdit = () => {
    if (hub) {
      hub.open(props);
    }
  };
  return (
    <GridItem className="hub-and-spoke-item" span={size}>
      <div className="hub-and-spoke-header">
        <h1>
          {props.title}
        </h1>
        <div className="hub-and-spoke-nav">
          <Button variant="plain" aria-label={`edit-${props.id}`} onClick={onEdit}>
            <EditIcon/>
          </Button>
        </div>
      </div>
      <div className="hub-and-spoke-body">
        {props.overview.component}
      </div>
    </GridItem>
  );
}

interface HubFormCardProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

function HubFormCard(props: HubFormCardProps) {
  const hub = useContext(HubContext);
  const onClose = () => {
    if (hub) {
      hub.close();
    }
  };
  return (
    <GridItem className="hub-and-spoke-item hub-and-spoke-item-form" span={12}>
      <div className="hub-and-spoke-header">
        <h1>
          {props.title}
        </h1>
        <div className="hub-and-spoke-nav">
          <Button variant="plain" aria-label={`close-${props.id}`} onClick={onClose}>
            <WindowCloseIcon />
          </Button>
        </div>
      </div>
      <div className="hub-and-spoke-body">
        {props.children}
      </div>
    </GridItem>
  );
}

interface HubAndSpokeProps {
  items: HubItem[];
}

export function HubNSpoke(props: HubAndSpokeProps) {
  const [selectedHub, setSelectedHub] = useState<HubItem | undefined>(undefined);

  const hub: Hub = {
    selected: selectedHub,
    open: (item: HubItem) => {
      setSelectedHub(item);
    },
    close: () => {
      setSelectedHub(undefined);
    },
  };

  return (
    <HubContext.Provider value={hub}>
      <Grid className="hub-and-spoke-container" gutter={'sm'}>
        {hub.selected ? (
            <HubFormCard id={hub.selected.id} title={hub.selected.title}>
              {hub.selected.form.component({close: hub.close})}
            </HubFormCard>
        ) : props.items.map((item, i) => (<HubOverviewCard {...item} key={i} />))}
      </Grid>
    </HubContext.Provider>
  );
}
