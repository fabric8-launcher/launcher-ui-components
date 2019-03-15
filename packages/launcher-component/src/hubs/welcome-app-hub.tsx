import * as React from 'react';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { Hub } from '../core/types';

export const WelcomeAppHub: Hub = {
  Overview: () => (
    <OverviewComplete title="Welcome Application is enabled">
      We will prepare a set of examples to let you directly start playing with your new application.
      Those examples are there to get you started,
      you will be able to easily remove them once created and start developing your awesome application.
    </OverviewComplete>
  )
};
