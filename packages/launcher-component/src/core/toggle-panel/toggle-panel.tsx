import React, { useState, ReactNode, Fragment } from 'react';
import { Button } from '@patternfly/react-core';
import { MinusCircleIcon, PlusCircleIcon } from '@patternfly/react-icons';

interface TogglePanelProps {
  title: string;
  children: ReactNode;
}

export function TogglePanel(props: TogglePanelProps) {
  const [collapse, setCollapse] = useState(false);
  return (
    <Fragment>
      <Button
        // @ts-ignore
        component="a"
        variant="link"
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <MinusCircleIcon /> : <PlusCircleIcon />} {props.title}
      </Button>
      {collapse && props.children}
    </Fragment>
  );
}
