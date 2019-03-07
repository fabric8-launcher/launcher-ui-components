import React, { Fragment } from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { AnalyzeResult } from 'launcher-client';
import { InputProps } from '../../core/types';
import { Loader } from '../../core/data-loader/data-loader';

export const defaultBuidImagePickerValue = {};

export interface BuildImageValue {
  imageName?: string;
}

interface BuildImageProps extends InputProps<BuildImageValue> {
  result: AnalyzeResult;
}

export function BuildImagePicker(props: BuildImageProps) {
  if (!props.value.imageName) {
    props.onChange({imageName: props.result.image});
    return (<Loader />);
  }
  const imageName = props.value.imageName;
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
            onChange={value => props.onChange({imageName: value})}
            aria-label="Select build image"
          >
            {props.result.builderImages.map((image, index) => (
              <FormSelectOption
                key={index}
                value={image.id}
                label={image.name}
              />
            ))
            }
          </FormSelect>
        </FormGroup>
      </Form>
    </Fragment>
  );
}
