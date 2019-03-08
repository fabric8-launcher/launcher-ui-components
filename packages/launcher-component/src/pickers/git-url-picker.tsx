import React from 'react';

import { InputProps } from '../core/types';
import { TextInput } from '@patternfly/react-core';

export interface GitUrlPickerValue {
  url: string;
}

interface GitUrlPickerProps extends InputProps<GitUrlPickerValue> {
}

const VALUE_REGEXP = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)');

export const isGitUrlPickerValueValid = (value: GitUrlPickerValue): boolean => {
  return VALUE_REGEXP.test(value.url);
};

export const defaultGitImportUrlPickerValue = {
  url: '',
};

export function GitUrlPicker(props: GitUrlPickerProps) {
  return (
    <TextInput
      isRequired
      type="text"
      id="git-url-picker"
      name="git-url-picker"
      placeholder="Type the git repository url"
      onChange={value => props.onChange({...props.value, url: value})}
      value={props.value.url}
    />
  );
}
