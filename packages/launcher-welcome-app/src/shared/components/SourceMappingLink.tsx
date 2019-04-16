import * as React from 'react';
import { ExternalLink } from './ExternalLink';
import { AngleDoubleRightIcon } from '@patternfly/react-icons';

export function SourceMappingLink(props: {
  sourceRepository?: {
    url: string;
    provider: string;
  };
  name: string;
  fileRepositoryLocation: string;
}) {
  if (props.sourceRepository && props.sourceRepository.provider === 'GitHub') {
    const link = `${props.sourceRepository.url.replace('.git', '')}/blob/master/${props.fileRepositoryLocation}`;
    const fileName = props.fileRepositoryLocation.replace(/^.*\//, '');
    return (<span>{fileName} (<ExternalLink href={link}>view source</ExternalLink>)</span>);
  }
  return (<span title={props.fileRepositoryLocation}><AngleDoubleRightIcon className="with-text"/> {props.name}</span>);
}
