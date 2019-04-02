import React from 'react';
import { Button } from '@patternfly/react-core';
import { ExternalLinkSquareAltIcon } from '@patternfly/react-icons';

export function ExternalLink(props: {
  'aria-label'?: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Button
      // @ts-ignore
      component="a"
      variant="link"
      href={props.href}
      aria-label={props['aria-label']}
      target={'_blank'}
    >
        {props.children} <ExternalLinkSquareAltIcon />
    </Button>);
}
