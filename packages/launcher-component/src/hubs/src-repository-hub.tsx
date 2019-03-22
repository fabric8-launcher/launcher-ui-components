import * as React from 'react';

import { DescriptiveHeader, Separator, SpecialValue } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import { BuildImagePicker, BuildImagePickerValue } from '../pickers/buildimage-picker';
import { BuildImageSuggestionsLoader } from '../loaders/buildimage-loader';
import { GitUrlPicker, GitUrlPickerValue } from '../pickers/git-url-picker';
import { FormHub } from '../core/types';
import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { EnvironmentVarsPicker, EnvironmentVarsPickerValue } from '../pickers/environmentvars-picker';
import { Loader } from '..';

export interface SrcRepositoryFormValue {
  gitUrlPickerValue?: GitUrlPickerValue;
  buildImagePickerValue?: BuildImagePickerValue;
  envPickerValue?: EnvironmentVarsPickerValue;
}

export const SrcRepositoryHub: FormHub<SrcRepositoryFormValue> = {
  checkCompletion: value => !!value.gitUrlPickerValue && GitUrlPicker.checkCompletion(value.gitUrlPickerValue)
    && !!value.buildImagePickerValue && BuildImagePicker.checkCompletion(value.buildImagePickerValue)
    && !!value.envPickerValue && EnvironmentVarsPicker.checkCompletion(value.envPickerValue),
  Overview: props => {
    if (!SrcRepositoryHub.checkCompletion(props.value)) {
      return (
        <EmptyState>
          <Title size="lg">You can import an existing application from a git location</Title>
          <EmptyStateBody>
            You will be able to run the application in a few seconds...
          </EmptyStateBody>
          <Button variant="primary" onClick={props.onClick}>Select Import</Button>
        </EmptyState>
      );
    }
    return (
      <OverviewComplete title="Import is configured">
        We will import the git repository <SpecialValue>{props.value.gitUrlPickerValue!.url!}</SpecialValue>&nbsp;
        using <SpecialValue>{props.value.buildImagePickerValue!.image!}</SpecialValue> builder image
      </OverviewComplete>
    );
  },
  Form: props => {
    return (
      <FormPanel
        initialValue={props.initialValue}
        validator={SrcRepositoryHub.checkCompletion}
        onSave={props.onSave}
        onCancel={props.onCancel}
      >
        {
          (inputProps) => (
            <React.Fragment>
              <DescriptiveHeader
                title="Source Location"
                description="You can choose the source repository to import you application from."
              />
              <GitUrlPicker.Element
                value={inputProps.value.gitUrlPickerValue || {}}
                onChange={(gitUrlPickerValue) => inputProps.onChange({...inputProps.value, gitUrlPickerValue})}
              />
              {inputProps.value.gitUrlPickerValue && GitUrlPicker.checkCompletion(inputProps.value.gitUrlPickerValue) && (
                <React.Fragment>
                  <Separator/>
                  <DescriptiveHeader
                    title="Builder Image"
                    description="A builder image is needed to build and deploy your application on OpenShift.
                        We've detected a likely candidate, but you are free to change if needed."
                  />
                  <BuildImageSuggestionsLoader gitUrl={inputProps.value.gitUrlPickerValue!.url!}>
                    {suggestions => {
                      if (!inputProps.value.buildImagePickerValue) {
                        inputProps.onChange({
                          ...inputProps.value,
                          buildImagePickerValue: {image: suggestions.suggestedBuilderImage.id},
                        });
                        return (<Loader/>);
                      }
                      if (!inputProps.value.envPickerValue) {
                        inputProps.onChange({
                          ...inputProps.value,
                          envPickerValue: {envVars: suggestions.getSuggestedEnvPairs(inputProps.value.buildImagePickerValue.image!)},
                        });
                        return (<Loader/>);
                      }
                      return (
                        <React.Fragment>
                          <BuildImagePicker.Element
                            value={inputProps.value.buildImagePickerValue}
                            onChange={(buildImagePickerValue) => {
                              inputProps.onChange({...inputProps.value, buildImagePickerValue, envPickerValue: undefined});
                            }}
                            builderImages={suggestions.builderImages}
                            suggestedImageName={`${suggestions.suggestedBuilderImage.name}(${suggestions.suggestedBuilderImage.id})`}
                          />
                          <Separator/>
                          <DescriptiveHeader
                            title="Environment Variables"
                            description="A builder image can be configured with some environment variables."
                          />
                          <EnvironmentVarsPicker.Element
                            value={inputProps.value.envPickerValue}
                            onChange={(envPickerValue) => inputProps.onChange({...inputProps.value, envPickerValue})}
                          />
                        </React.Fragment>
                      );
                    }}
                  </BuildImageSuggestionsLoader>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
      </FormPanel>
    );
  },
};
