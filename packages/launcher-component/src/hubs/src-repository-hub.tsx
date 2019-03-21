import * as React from 'react';

import { DescriptiveHeader, Separator, SpecialValue } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import { BuildImagePicker, BuildImagePickerValue } from '../pickers/buildimage-picker';
import { BuildImageAnalyzerLoader } from '../loaders/buildimage-loader';
import { GitUrlPicker, GitUrlPickerValue } from '../pickers/git-url-picker';
import { FormHub } from '../core/types';
import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { EnvironmentVarsPickerValue, EnvironmentVarsPicker } from '../pickers/environmentvars-picker';
import { AnalyzeResult } from 'launcher-client';

export interface SrcRepositoryFormValue {
  gitUrlPickerValue?: GitUrlPickerValue;
  buildImagePickerValue?: BuildImagePickerValue;
  environmentPickerValue?: EnvironmentVarsPickerValue;
}

export const SrcRepositoryHub: FormHub<SrcRepositoryFormValue> = {
  checkCompletion: value => !!value.gitUrlPickerValue && GitUrlPicker.checkCompletion(value.gitUrlPickerValue)
    && !!value.buildImagePickerValue && BuildImagePicker.checkCompletion(value.buildImagePickerValue)
    && !!value.environmentPickerValue && EnvironmentVarsPicker.checkCompletion(value.environmentPickerValue),
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
        using <SpecialValue>{props.value.buildImagePickerValue!.imageName!}</SpecialValue> builder image
      </OverviewComplete>
    );
  },
  Form: props => {
    const convert = object => {
      const result: Array<{ key: string; value: string }> = [];
      let i = 0;
      for (const k in object) {
        if (object.hasOwnProperty(k)) {
          result[i++] = { key: k, value: object[k] };
        }
      }
      return result;
    };
    const builderImage = (result: AnalyzeResult) => {
      const image = result.builderImages.find(i => i.id === result.image);
      if (!image) {
        throw Error('invalid builder image');
      }
      return image;
    };

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
                <BuildImageAnalyzerLoader gitUrl={inputProps.value.gitUrlPickerValue!.url!}>
                  {result => (
                    <React.Fragment>
                      <BuildImagePicker.Element
                        value={inputProps.value.buildImagePickerValue || {}}
                        onChange={(buildImagePickerValue) => inputProps.onChange({...inputProps.value, buildImagePickerValue})}
                        result={result}
                      />
                      <Separator/>
                      <DescriptiveHeader
                        title="Environment Variables"
                        description="A builder image can be configured with some environment variables."
                      />
                      <EnvironmentVarsPicker.Element
                        value={inputProps.value.environmentPickerValue || { envVars: convert(builderImage(result).metadata.suggestedEnv)}}
                        onChange={(value) => inputProps.onChange({...inputProps.value, value})}
                      />
                    </React.Fragment>
                  )}
                </BuildImageAnalyzerLoader>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </FormPanel>
  );},
};
