import React, { Fragment } from 'react';
import { TextInput, Button, Split, SplitItem } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

import { InputProps, Picker } from '../core/types';

export interface EnvironmentVarsPickerValue {
  envVars: Map<string, string>;
}

interface EnvironmentVarsPickerProps extends InputProps<EnvironmentVarsPickerValue> {
}

export const EnvironmentVarsPicker: Picker<EnvironmentVarsPickerProps, EnvironmentVarsPickerValue> = {
  checkCompletion: value => !!value.envVars,
  Element: props => {
    const values = props.value.envVars || new Map([['', '']]);
    let index = 0;
    return (
      <Fragment>
        {Array.from(values.keys()).map(key => {
          index++;
          return (
          <Split key={'split' + index}>
            <SplitItem isMain key={'split-name' + index}>
              <TextInput
                isRequired
                type="text"
                key={'name' + index}
                id={'env-var-name' + index}
                name="env-var-name"
                placeholder="Type the environment variable name"
                onChange={value => {
                  values.set(value, values.get(key) || '');
                  values.delete(key);
                  props.onChange({ envVars: values });
                }}
                value={key}
              />
            </SplitItem>
            <SplitItem isMain key={'split-value' + key}>
              <TextInput
                isRequired
                type="text"
                key={'value' + index}
                id={'env-var-value' + index}
                name="env-var-value"
                placeholder="Type the environment variable value"
                onChange={value => {
                  values.set(key, value);
                  props.onChange({ envVars: values });
                }}
              />
            </SplitItem>
          </Split>);
          }
        )}
        <Button onClick={() => props.onChange({ envVars: values.set('', '') })}><PlusCircleIcon /></Button>
      </Fragment>
    );
  }
};
