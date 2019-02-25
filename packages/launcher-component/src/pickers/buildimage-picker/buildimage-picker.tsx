import React, { Fragment } from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { AnalyzeResult } from 'launcher-client';
import { InputProps } from '../../core/types';

export const defaultBuidImagePickerValue = {};

export interface BuildImageItemValue {
  imageName?: string;
}

interface BuildImageItemProps extends InputProps<BuildImageItemValue> {
  result: AnalyzeResult;
}

export function BuildImagePicker(props: BuildImageItemProps) {
  const imageName = props.result.name;
  return (
    <Fragment>
      <p>Analyzed your code, this is the build image we suggest: <i>"{imageName}"</i></p>
      <p>But we could be wrong, you can change the image here:</p>
      <Form>
        <FormGroup
          label="Build image"
          isRequired
          fieldId="imageName"
        >
          <FormSelect
            id="imageName"
            value={imageName}
            onChange={value => props.onChange({ imageName: value })}
            aria-label="Select build image"
          >
            <FormSelectOption
              key={0}
              value={props.result.id}
              label={props.result.name}
            />
          </FormSelect>
        </FormGroup>
      </Form>
    </Fragment>
  );
}
