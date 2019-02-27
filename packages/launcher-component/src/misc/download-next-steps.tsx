import * as React from 'react';
import { Alert } from '@patternfly/react-core';
import { DownloadIcon } from '@patternfly/react-icons';
import { ExternalLink } from './external-link';

interface DownloadNextStepsProps {
  error?: boolean;
  downloadLink?: string;
}

export function DownloadNextSteps(props: DownloadNextStepsProps) {
  return (
    <React.Fragment>
      {!props.error && (
        <React.Fragment>
          <Alert variant="success" title="Launch Success" aria-label="launch-success">Your Application is Ready</Alert>
          <h2>Download your application</h2>
          <p>
            You are ready to start working.
          </p>
          <ExternalLink href={props.downloadLink as string}>
            <DownloadIcon /> Download .zip
          </ExternalLink>
          <h2>Deploy it on OpenShift</h2>
          <p>
            Your new application contains a tool to help you deploy your new application on OpenShift.
            You can find instructions in the README.md.
          </p>
          <h2>As soon as deployment is done, go checkout your new application capabilities</h2>
          <p>We prepared a set of examples to let you directly start playing with your new application.
            Those examples are there to get you started,
            soon it will be time for you to remove them and start developing your awesome application.</p>
        </React.Fragment>
      )}
      {props.error && (
        <Alert variant="danger" title="Launch Error" aria-label="error-during-launch">
          <p>Holy guacamole... something weird happened, please reload the page to try again.</p>
          <p>{props.error.toString()}</p>
        </Alert>
      )}
    </React.Fragment>
  );
}
