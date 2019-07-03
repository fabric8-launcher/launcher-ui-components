import React, { useState } from 'react';
import { TextInput, FormGroup, TextInputProps, FormGroupProps, Omit } from '@patternfly/react-core';
import { useAnalytics } from '../../analytics';

interface LaunchTextInputProps extends Omit<TextInputProps & FormGroupProps, 'fieldId' | 'id'> {
  id: string;
}

export function LaunchTextInput(props: LaunchTextInputProps) {
  const [isDirty, setIsDirty] = useState(false);
  const { onChange, isValid, helperTextInvalid, label, ...rest } = props;
  const analytics = useAnalytics();
  return (
    <FormGroup
      fieldId={props.id}
      label={label}
      isValid={isValid || !isDirty}
      helperTextInvalid={helperTextInvalid}
    >
      <TextInput
        onChange={(value, event) => {
          if(!isDirty) {
            analytics.event('Input', 'Customized-Value', props.id);
          }
          setIsDirty(true);
          if (onChange) {
            onChange(value, event);
          }
        }}
        isValid={isValid || !isDirty}
        {...rest}
      />
    </FormGroup>
  );
}
