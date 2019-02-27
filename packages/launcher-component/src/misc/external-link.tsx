import React from 'react';
import { Button } from '@patternfly/react-core';
import { ExternalLinkSquareAltIcon } from '@patternfly/react-icons';

export function ExternalLink(props: {
  children: React.ReactNode
  href: string
}) {
  return (
    <Button
      // @ts-ignore
      component="a"
      variant="link"
      href={props.href}
      target={'_blank'}
    >
        {props.children} <ExternalLinkSquareAltIcon />
    </Button>);
}
