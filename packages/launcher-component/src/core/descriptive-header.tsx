import { Title } from '@patternfly/react-core';
import * as React from 'react';

export function DescriptiveHeader(props: { title: string, description: string }) {
  return (
    <div className="descriptive-header" style={{margin: '10px 0'}}>
      <Title size="lg">{props.title}</Title>
      <p>{props.description}</p>
    </div>
  );
}
