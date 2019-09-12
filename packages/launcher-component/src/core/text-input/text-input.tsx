import React, { useState } from 'react';
import { TextInput, FormGroup, TextInputProps } from '@patternfly/react-core';
import { useAnalytics } from '../../analytics';

interface ExtendedTextInputProps extends TextInputProps {
  id: string;
  helperTextInvalid: string;
}

export function ExtendedTextInput(props: ExtendedTextInputProps) {
  const [isDirty, setIsDirty] = useState(false);
  const { onChange, isValid, helperTextInvalid, label, ...rest } = props;
  const analytics = useAnalytics();
  const valid = (!isDirty && !props.value) || isValid 
  return (
    <FormGroup
      fieldId={props.id}
      label={label}
      isValid={valid}
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
        isValid={valid}
        {...rest as any}
      />
    </FormGroup>
  );
}
