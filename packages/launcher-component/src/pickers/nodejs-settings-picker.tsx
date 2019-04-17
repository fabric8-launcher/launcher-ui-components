import { Form, FormGroup, TextInput } from '@patternfly/react-core';
import React from 'react';
import { InputProps, Picker } from '../core/types';

export interface NodeJSSettingsPickerValue {
  name: string;
  version: string;
}

interface NodeJSSettingsPickerProps extends InputProps<NodeJSSettingsPickerValue> {
}

const NAME_REGEXP = /^(?=.{1,214}$)(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const VERSION_REGEXP = /^.*[0-9]{1,5}\.[0-9]{1,5}\.[0-9]{1,5}$/;

export const NodeJSSettingsPicker: Picker<NodeJSSettingsPickerProps, NodeJSSettingsPickerValue> = {
  checkCompletion: value => !!value.name && NAME_REGEXP.test(value.name)
    && !!value.version && VERSION_REGEXP.test(value.version),
  Element: props => {
    return (
      <Form>
        <FormGroup
          label="Name"
          isRequired
          fieldId="name"
          helperTextInvalid="Please provide a valid name"
          isValid={NAME_REGEXP.test(props.value.name || '')}
        >
          <TextInput
            isRequired
            type="text"
            id="name"
            name="name"
            aria-describedby="name"
            value={props.value.name}
            onChange={value => props.onChange({ ...props.value, name: value })}
            pattern={NAME_REGEXP.source}
            isValid={NAME_REGEXP.test(props.value.name || '')}
          />
        </FormGroup>
        <FormGroup
          label="Version"
          isRequired
          fieldId="version"
          helperTextInvalid="Please provide a version number"
          isValid={VERSION_REGEXP.test(props.value.version || '')}
        >
          <TextInput
            isRequired
            type="text"
            id="version"
            name="version"
            aria-describedby="version"
            value={props.value.version}
            onChange={value => props.onChange({ ...props.value, version: value })}
            isValid={VERSION_REGEXP.test(props.value.version || '')}
          />
        </FormGroup>
      </Form>
    );
  }
};
