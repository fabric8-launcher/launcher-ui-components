import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { Wizard, WizardStep, WizardButton } from '../wizard';

storiesOf('Core', module)
    .add('Wizard', () => (
        <Wizard>
            <WizardStep title={'Step 1'} completed={true}>Step 1 form</WizardStep>
            <WizardStep title={'Step 2'} selected={true}>
                <p>Step 2 form</p>
                <WizardButton />
            </WizardStep>
            <WizardStep title={'Step 3'} locked={true}>Step 3 form</WizardStep>
        </Wizard>
    ));
