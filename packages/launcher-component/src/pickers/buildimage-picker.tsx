import React, { Fragment } from 'react';
import { DataListItem, DataListCell, Title, DataList, Radio, Button, Alert } from '@patternfly/react-core';
import { AnalyzeResult } from 'launcher-client';
import { InputProps } from '../core/types';
import { Loader } from '../core/data-loader/data-loader';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { SpecialValue } from '../core/stuff';

export const defaultBuidImagePickerValue = {};

export interface BuildImageValue {
  imageName?: string;
  advanced?: boolean;
}

interface BuildImageProps extends InputProps<BuildImageValue> {
  result: AnalyzeResult;
}

export function BuildImagePicker(props: BuildImageProps) {
  if (!props.value.imageName) {
    props.onChange({ imageName: props.result.image });
    return (<Loader />);
  }
  return (
    <Fragment>
      <p>
        For your codebase, our runtime detection algorithm suggest this image: <SpecialValue>{props.result.image}</SpecialValue>
      </p>
      <Button
        // @ts-ignore
        component="a"
        variant="link"
        onClick={() => props.onChange({ ...props.value, advanced: true })}
      >
        <PlusCircleIcon /> Advanced settings
      </Button>
      {props.value.advanced &&
        <Fragment>
          <Alert variant="warning" title="Picking the wrong image may result in an failed deployment!" style={{ margin: '20px' }}/>
          <DataList aria-label="select-buildImage">
            {props.result.builderImages.map((image, index) => {
              const isSelected = props.value.imageName === image.id;
              const onChangeSelected = () => {
                props.onChange({ ...props.value, imageName: image.id });
              };

              return (
                <DataListItem aria-labelledby={image.name} isExpanded={false} key={index}>
                  <DataListCell width={1} style={{ flex: 'none' }}>
                    <Radio
                      aria-label={`Choose ${image.name} as mission`}
                      value={image.id}
                      checked={isSelected}
                      onChange={onChangeSelected}
                      name="imageName"
                      id={`radio-choose-${image.id}-as-image`}
                    />
                  </DataListCell>
                  <DataListCell width={1} onClick={onChangeSelected} style={{ cursor: 'pointer' }}>
                    <Title size="lg">{image.name}</Title>
                  </DataListCell>
                  <DataListCell width={2} onClick={onChangeSelected} style={{ cursor: 'pointer' }}>
                    {image.id}
                  </DataListCell>
                </DataListItem>
              );
            })
            }
          </DataList>
        </Fragment>
      }
    </Fragment>
  );
}
