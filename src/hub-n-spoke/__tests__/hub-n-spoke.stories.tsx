import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {HubNSpoke} from '..';
import {mockItems} from "./mock-items";


storiesOf('HubNSpoke', module)
  .add('simple', () => (
    <HubNSpoke items={mockItems}/>
  ));
