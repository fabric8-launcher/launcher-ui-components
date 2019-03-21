import React, { Fragment } from 'react';
import { TextInput, Button, Split, SplitItem } from '@patternfly/react-core';
import { PlusCircleIcon, TrashIcon } from '@patternfly/react-icons';

import { InputProps, Picker } from '../core/types';

const VALID_ENV_KEY_REGEXP = new RegExp('^$|^[-._a-zA-Z][-._a-zA-Z0-9]*$');

export interface EnvironmentVarsPickerValue {
  envVars: Map<string, string>;
}

interface EnvironmentVarsPickerProps extends InputProps<EnvironmentVarsPickerValue> {
}

export const EnvironmentVarsPicker: Picker<EnvironmentVarsPickerProps, EnvironmentVarsPickerValue> = {
  checkCompletion: value => !!value.envVars
    && Array.from(value.envVars.keys()).map(key => VALID_ENV_KEY_REGEXP.test(key)).reduce((a, b) => a && b),
  Element: props => {
    const values = props.value.envVars || new Map([['', '']]);
    const isValid: (value: string) => boolean = value => VALID_ENV_KEY_REGEXP.test(value || '');
    let index = 0;
    return (
      <Fragment>
        {Array.from(values.keys()).map(key => {
          index++;
          return (
            <Split key={'split' + index} gutter="sm">
              <SplitItem isMain key={'split-name' + index}>
                <TextInput
                  isRequired
                  type="text"
                  key={'name' + index}
                  id={'env-var-name' + index}
                  name="env-var-name"
                  placeholder="Type the environment variable name"
                  pattern="[-._a-zA-Z][-._a-zA-Z0-9]*"
                  onChange={value => {
                    values.set(value, values.get(key) || '');
                    values.delete(key);
                    props.onChange({ envVars: values });
                  }}
                  isValid={isValid(key)}
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
                  value={values.get(key)}
                />
              </SplitItem>
              <SplitItem isMain={false} key={'split-button' + index}>
                <Button
                  onClick={() => {
                    values.delete(key);
                    if (values.size === 0) {
                      values.set('', '');
                    }
                    props.onChange({ envVars: values });
                  }}
                >
                  <TrashIcon />
                </Button>
              </SplitItem>
            </Split>);
        }
        )}
        <Button onClick={() => props.onChange({ envVars: values.set('', '') })}><PlusCircleIcon /></Button>
      </Fragment>
    );
  }
};
