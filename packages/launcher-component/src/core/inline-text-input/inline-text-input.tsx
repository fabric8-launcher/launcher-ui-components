import React from 'react';
import { Text, TextInput, TextVariants, TextInputProps } from '@patternfly/react-core';

import style from './inline-text-input.module.scss';

interface InlineTextInputProps extends TextInputProps {
  title: string;
}

export function InlineTextInput(props: InlineTextInputProps) {
  return (
    <div className={style.title}>
      <Text component={TextVariants.h1}>{props.title}</Text>
      <div className={style.input}>
        <TextInput {...props} type="text"/>
      </div>
    </div>
  );
}