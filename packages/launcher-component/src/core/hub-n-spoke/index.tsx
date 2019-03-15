import * as React from 'react';
import { ReactElement, useContext, useState } from 'react';
import { Alert, AlertVariant, Button, Grid, GridItem, Text, TextVariants } from '@patternfly/react-core';
import { EditIcon, WindowCloseIcon } from '@patternfly/react-icons';

import style from './hub-n-spoke.module.scss';

export interface HubItem {
  id: string;
  title: string;
  visible?: boolean;
  overview: {
    component: (props: { edit: () => void }) => ReactElement<any>;
    width?: 'third' | 'half' | 'full';
  };
  form?: {
    component: (props: { close: () => void }) => ReactElement<any>;
  };
}

interface Hub {
  selected?: HubItem;

  open(item: HubItem);

  close();
}

const width = {
  quarter: 3,
  third: 4,
  half: 6,
  full: 12,
};

export const HubContext = React.createContext<Hub | undefined>(undefined);

export function HubOverviewCard(props: HubItem) {
  const hub = useContext(HubContext);
  const w = props.overview.width || 'quarter';
  const size = width[w];
  const onEdit = () => {
    if (hub) {
      hub.open(props);
    }
  };
  return (
    // @ts-ignore
    <GridItem className="hub-and-spoke-item" sm={Math.min(size * 2, 12)} md={size}>
      <div className="hub-and-spoke-header">
        <h1>
          {props.title}
        </h1>
        <div className="hub-and-spoke-nav">
          {props.form && (
            <Button variant="plain" aria-label={`edit-${props.id}`} onClick={onEdit}>
              <EditIcon/>
            </Button>
          )}
        </div>
      </div>
      <div className="hub-and-spoke-body">
        {props.overview.component({edit: onEdit})}
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
            <WindowCloseIcon/>
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
  title: string;
  items: HubItem[];
  toolbar?: React.ReactNode;
  error?: any;
  hint?: string;
}

export function Error(props: { error: any }) {
  return (
    <Alert variant={AlertVariant.danger} title="Something weird happened:" aria-label="error-in-hub-n-spoke" style={{margin: '40px'}}>
      {props.error.toString()}
    </Alert>
  );
}

export function Hint(props: { value: string }) {
  return (
    <Alert variant={AlertVariant.info} title="What should I do?" aria-label="hint-in-hub-n-spoke" style={{margin: '40px'}}>
      {props.value}
    </Alert>
  );
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
    <div className={style.hubNSpoke}>
      <HubContext.Provider value={hub}>
        <Text component={TextVariants.h1} className="hub-and-spoke-title">{props.title}</Text>
        {!hub.selected && props.error && (
          <Error error={props.error}/>
        )}
        {!hub.selected && props.hint && (
          <Hint value={props.hint}/>
        )}
        <Grid className="hub-and-spoke-container" gutter={'sm'}>
          {hub.selected ? (
            <HubFormCard id={hub.selected.id} title={hub.selected.title}>
              {hub.selected.form!.component({close: hub.close})}
            </HubFormCard>
          ) : props.items.filter(i => i.visible === undefined || i.visible)
            .map((item, i) => (<HubOverviewCard {...item} key={i}/>))}
        </Grid>
        {!hub.selected && props.toolbar}
      </HubContext.Provider>
    </div>
  );
}
