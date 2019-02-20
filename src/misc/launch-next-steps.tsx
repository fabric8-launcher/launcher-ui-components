import * as React from 'react';
import { Alert, Button } from '@patternfly/react-core';
import { ClusterIcon, CodeIcon, GiftIcon } from '@patternfly/react-icons';

interface LaunchNextStepsProps {
  error?: any;
  landingPageLink?: string;
  repositoryLink?: string;
  deploymentLink?: string;
}

export function LaunchNextSteps(props: LaunchNextStepsProps) {
  const landingPageLink = props.landingPageLink || 'https://fabric8-launcher.github.io/application-creator-landingpage/';
  const repositoryLink = props.repositoryLink || 'https://github.com/fabric8-launcher/launcher-creator-frontend';
  const deploymentLink = props.deploymentLink || 'https://manage.openshift.com/';
  return (
    <React.Fragment>
      {!props.error && (
        <React.Fragment>
          <Alert variant="success" title="Launch Success" aria-label="launch-success">Your application deployment has started</Alert>
          <h2>Follow your application delivery</h2>
          <p>You can follow your application deployment in your OpenShift Console</p>
          <Button variant="link" href={deploymentLink} target={'_blank'}>
            <ClusterIcon/> OpenShift Console
          </Button>
          <h2>As soon as deployment is done, check out your new application capabilities</h2>
          <p>We prepared a set of examples to let you directly start playing with your new application.
            Those examples are there to get you started,
            soon it will be time for you to remove them and start developing your awesome application.</p>
          <Button variant="link" href={landingPageLink} target={'_blank'}>
            <GiftIcon/> Check out your new Application
          </Button>
          <h2>Update your application using Continuous Delivery</h2>
          <p>We set up your application codebase in the GitHub repository you requested</p>
          <p>Your application is automatically configured to build and deploy on OpenShift with new commits.</p>
          <Button variant="link" href={repositoryLink} target={'_blank'}>
            <CodeIcon/> Clone your new codebase
          </Button>
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
