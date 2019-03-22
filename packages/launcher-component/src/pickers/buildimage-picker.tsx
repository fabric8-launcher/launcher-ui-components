import React, { Fragment } from 'react';
import { Alert, Button, DataList, DataListCell, DataListItem, Radio, Title } from '@patternfly/react-core';
import { BuilderImage } from 'launcher-client';
import { InputProps, Picker } from '../core/types';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { SpecialValue } from '../core/stuff';

export interface BuildImagePickerValue {
  image?: string;
  advanced?: boolean;
}

interface BuildImageProps extends InputProps<BuildImagePickerValue> {
  suggestedImageName: string;
  builderImages: BuilderImage[];
}

export const BuildImagePicker: Picker<BuildImageProps, BuildImagePickerValue> = {
  checkCompletion: value => !!value.image,
  Element: props => {
    return (
      <Fragment>
        <p>
          For your codebase, our runtime detection algorithm suggest this image: <SpecialValue>{props.suggestedImageName}</SpecialValue>
        </p>
        <Button
          // @ts-ignore
          component="a"
          variant="link"
          onClick={() => props.onChange({...props.value, advanced: true})}
        >
          <PlusCircleIcon/> Advanced settings
        </Button>
        {props.value.advanced &&
        <Fragment>
            <Alert variant="warning" title="Picking the wrong image may result in an failed deployment!" style={{margin: '20px'}}/>
            <DataList aria-label="select-buildImage">
              {props.builderImages.map((image, index) => {
                const isSelected = props.value.image === image.id;
                const onChangeSelected = () => {
                  props.onChange({...props.value, image: image.id});
                };

                return (
                  <DataListItem aria-labelledby={image.name} isExpanded={false} key={index}>
                    <DataListCell width={1} style={{flex: 'none'}}>
                      <Radio
                        aria-label={`Choose ${image.name} as mission`}
                        value={image.id}
                        checked={isSelected}
                        onChange={onChangeSelected}
                        name="image"
                        id={`radio-choose-${image.id}-as-image`}
                      />
                    </DataListCell>
                    <DataListCell width={1} onClick={onChangeSelected} style={{cursor: 'pointer'}}>
                      <Title size="lg">{image.name}</Title>
                    </DataListCell>
                    <DataListCell width={2} onClick={onChangeSelected} style={{cursor: 'pointer'}}>
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
};
