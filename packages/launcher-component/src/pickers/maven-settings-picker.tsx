import { Form, FormGroup, TextInput } from '@patternfly/react-core';
import React from 'react';
import { InputProps, Picker } from '../core/types';

export interface MavenSettingsPickerValue {
  groupId: string;
  artifactId: string;
  version: string;
}

interface MavenSettingsPickerProps extends InputProps<MavenSettingsPickerValue> {
}

const VALUE_REGEXP = /^[a-z][a-z0-9-\.]{3,63}$/;

export const MavenSettingsPicker: Picker<MavenSettingsPickerProps, MavenSettingsPickerValue> = {
  checkCompletion: value => !!value.groupId && VALUE_REGEXP.test(value.groupId)
    && !!value.artifactId && VALUE_REGEXP.test(value.artifactId) && !!value.version,
  Element: props => {
    const isValid = (value: string) => VALUE_REGEXP.test(value || '');
    return (
      <Form>
        <FormGroup
          label="GroupId"
          isRequired
          fieldId="groupId"
          helperTextInvalid="Please provide a valid groupId"
          isValid={isValid(props.value.groupId)}
        >
          <TextInput
            isRequired
            type="text"
            id="groupId"
            name="groupId"
            aria-describedby="groupId"
            value={props.value.groupId}
            onChange={value => props.onChange({ ...props.value, groupId: value })}
            pattern={VALUE_REGEXP.source}
            isValid={isValid(props.value.groupId)}
          />
        </FormGroup>
        <FormGroup
          label="ArtifactId"
          isRequired
          fieldId="artifactId"
          helperTextInvalid="Please provide a valid artifactId"
          isValid={isValid(props.value.artifactId)}
        >
          <TextInput
            isRequired
            type="text"
            id="artifactId"
            name="artifactId"
            aria-describedby="artifactId"
            value={props.value.artifactId}
            onChange={value => props.onChange({ ...props.value, artifactId: value })}
            pattern={VALUE_REGEXP.source}
            isValid={isValid(props.value.artifactId)}
          />
        </FormGroup>
        <FormGroup
          label="Version"
          isRequired
          fieldId="version"
          helperTextInvalid="Please provide a version number"
          isValid={!!props.value.version}
        >
          <TextInput
            isRequired
            type="text"
            id="version"
            name="version"
            aria-describedby="version"
            value={props.value.version}
            onChange={value => props.onChange({ ...props.value, version: value })}
            isValid={!!props.value.version}
          />
        </FormGroup>
      </Form>
    );
  }
};
