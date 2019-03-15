import { DescriptiveHeader } from '../core/stuff';
import * as React from 'react';
import { RuntimePicker, RuntimePickerValue } from '../pickers/runtime-picker';
import { EnumsRuntimesLoaders, RuntimeLoader } from '../loaders/enums-runtimes-loaders';
import { FormPanel } from '../core/form-panel/form-panel';
import { FormHub } from '../core/types';
import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';

export interface FrontendFormValue {
  runtimePickerValue?: RuntimePickerValue;
}

export const FrontendHub: FormHub<FrontendFormValue> = {
  checkCompletion: value => !!value.runtimePickerValue && RuntimePicker.checkCompletion(value.runtimePickerValue),
  Overview: props => {
    if (!FrontendHub.checkCompletion(props.value)) {
      return (
        <EmptyState>
          <Title size="lg">You can configure a Frontend for your application</Title>
          <EmptyStateBody>
            You will be able to bootstrap the frontend of your application in a few seconds...
          </EmptyStateBody>
          <Button variant="primary" onClick={props.onClick}>Configure a Frontend</Button>
        </EmptyState>
      );
    }
    return (
      <RuntimeLoader id={props.value.runtimePickerValue!.id!}>
        {runtime => (
          <OverviewComplete title={`Your ${runtime!.name} frontend is configured`}>
            <img src={runtime!.icon} style={{margin: '5px auto', height: '160px'}}/>
          </OverviewComplete>
        )}
      </RuntimeLoader>
    );
  },
  Form: props => (
    <FormPanel
      initialValue={props.initialValue}
      // We don't check completion because no backend (with a frontend) is valid
      onSave={props.onSave}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              description="You may optionally select a frontend application to bootstrap your web-based development.
                        These options scaffold a starting point in your framework of choice."
            />
            <EnumsRuntimesLoaders category="frontend">
              {(items) => (
                <RuntimePicker.Element
                  items={items}
                  value={inputProps.value.runtimePickerValue || {}}
                  onChange={(runtimePickerValue) => inputProps.onChange({...inputProps.value, runtimePickerValue})}
                />
              )}
            </EnumsRuntimesLoaders>
          </React.Fragment>
        )}
    </FormPanel>
  ),
};
