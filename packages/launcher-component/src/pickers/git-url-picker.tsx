import React from 'react';

import { InputProps, Picker } from '../core/types';
import { TextInput } from '@patternfly/react-core';

export interface GitUrlPickerValue {
  url?: string;
}

interface GitUrlPickerProps extends InputProps<GitUrlPickerValue> {
}

const VALUE_REGEXP = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)');

export const GitUrlPicker: Picker<GitUrlPickerProps, GitUrlPickerValue> = {
  checkCompletion: value => !!value.url && VALUE_REGEXP.test(value.url),
  Element: props => (
    <TextInput
      isRequired
      type="text"
      id="git-url-picker"
      name="git-url-picker"
      aria-label="Git repository url"
      placeholder="Type the git repository url"
      onChange={value => props.onChange({...props.value, url: value.length > 0 ? value.trim() : undefined})}
      value={props.value.url || ''}
    />
  )
};
