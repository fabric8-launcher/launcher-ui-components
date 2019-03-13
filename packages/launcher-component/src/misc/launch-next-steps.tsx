import * as React from 'react';
import { Button, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { ClusterIcon, CodeIcon, GiftIcon } from '@patternfly/react-icons';
import { ExternalLink } from './external-link';
import { FixedModal } from '../core/stuff';

interface LaunchNextStepsProps {
  links?: { [x: string]: string | undefined };
  onClose: () => void;
}

export function LaunchNextSteps(props: LaunchNextStepsProps) {
  const links = props.links || {};
  const landingPageLink = (links['GITHUB_CREATE'] || 'https://fabric8-launcher.github.io/application-creator-landingpage/')
    + '/blob/master/README.adoc';
  const repositoryLink = links['GITHUB_CREATE'] || 'https://github.com/fabric8-launcher/launcher-creator-frontend';
  const deploymentLink = links['OPENSHIFT_CREATE'] || 'https://manage.openshift.com/';
  return (
    <FixedModal
      title="Your Application deployment has started"
      isOpen
      isLarge={false}
      onClose={props.onClose}
      actions={[
        <Button key="launch-new" variant="secondary" onClick={props.onClose}>
          Launch a new Application
        </Button>,
      ]}
    >
      <TextContent>
        <Text component={TextVariants.h3}>Follow your application delivery</Text>
        <Text component={TextVariants.p}>You can follow your application deployment in your OpenShift Console</Text>
        <ExternalLink href={deploymentLink}>
          <ClusterIcon/> OpenShift Console
        </ExternalLink>
        <Text component={TextVariants.h3}>As soon as deployment is done, check out your new application capabilities</Text>
        <Text component={TextVariants.p}>
          We prepared a set of examples to let you directly start playing with your new application.<br/>
          Those examples are there to get you started,<br/>
          soon it will be time for you to remove them and start developing your awesome application.</Text>
        <ExternalLink href={landingPageLink}>
          <GiftIcon/> Check out your new Application
        </ExternalLink>
        <Text component={TextVariants.h3}>Update your application using Continuous Delivery</Text>
        <Text component={TextVariants.p}>We set up your application codebase in the GitHub repository you requested</Text>
        <Text component={TextVariants.p}>Your application is automatically configured
          to build and deploy on OpenShift with new commits.</Text>
        <ExternalLink href={repositoryLink}>
          <CodeIcon/> Clone your new codebase
        </ExternalLink>
      </TextContent>
    </FixedModal>
  );
}
