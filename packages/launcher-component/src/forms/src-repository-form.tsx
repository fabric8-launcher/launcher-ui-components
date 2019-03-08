import * as React from 'react';

import { DescriptiveHeader, Separator } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import { BuildImagePicker, BuildImageValue, defaultBuidImagePickerValue } from '../pickers/buildimage-picker';
import { BuildImageAnalyzerLoader } from '../loaders/buildimage-loader';
import { defaultGitImportUrlPickerValue, GitUrlPicker, GitUrlPickerValue, isGitUrlPickerValueValid } from '../pickers/git-url-picker';

export interface SrcRepositoryFormValue {
  sourceGit: GitUrlPickerValue;
  buildImage: BuildImageValue;
}

export function isSrcRepositoryFormValueValid(value: SrcRepositoryFormValue) {
  return isGitUrlPickerValueValid(value.sourceGit) && !!value.buildImage.imageName;
}

export const defaultSrcRepositoryFormValue: SrcRepositoryFormValue = {
  sourceGit: defaultGitImportUrlPickerValue,
  buildImage: defaultBuidImagePickerValue
};

interface SrcRepositoryFormProps {
  value: SrcRepositoryFormValue;

  onSave?(value: SrcRepositoryFormValue);

  onCancel?();
}

export function SrcRepositoryForm(props: SrcRepositoryFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isSrcRepositoryFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              title="Source Location"
              description="You can choose the source repository to import you application from."
            />
            <GitUrlPicker
              value={inputProps.value.sourceGit}
              onChange={(sourceGit) => inputProps.onChange({...inputProps.value, sourceGit})}
            />
            {isGitUrlPickerValueValid(inputProps.value.sourceGit) && (
              <React.Fragment>
                <Separator/>
                <DescriptiveHeader
                  title="Builder Image"
                  description="A builder image is needed to build and deploy your application on OpenShift.
                        We've detected a likely candidate, but you are free to change if needed."
                />
                <BuildImageAnalyzerLoader gitUrl={inputProps.value.sourceGit.url}>
                  {result => (
                    <BuildImagePicker
                      value={inputProps.value.buildImage}
                      onChange={(buildImage) => inputProps.onChange({...inputProps.value, buildImage})}
                      result={result}
                    />
                  )}
                </BuildImageAnalyzerLoader>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </FormPanel>
  );
}
