import * as React from 'react';

import { DescriptiveHeader } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import {
  RepositoryPickerValue,
  defaultRepoPickerValue,
  RepositoryPicker,
  isRepositoryPickerValueValid
} from '../pickers/repository-picker/repository-picker';
import { BuildImageValue, defaultBuidImagePickerValue, BuildImagePicker } from '../pickers/buildimage-picker/buildimage-picker';
import { GitInfoLoader } from '../loaders/git-info-loader';
import { BuildImageAnalyzerLoader } from '../loaders/buildimage-loader';

export interface ImportFormValue {
  repository: RepositoryPickerValue;
  buildImage: BuildImageValue;
}

export function isImportFormValueValid(value: ImportFormValue) {
  return isRepositoryPickerValueValid(value.repository) && !!value.buildImage.imageName;
}

export const defaultImportFormValue: ImportFormValue = {
  repository: defaultRepoPickerValue,
  buildImage: defaultBuidImagePickerValue
};

interface ImportFormProps {
  value: ImportFormValue;

  onSave?(value: ImportFormValue);
  onCancel?();
}

export function ImportForm(props: ImportFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isImportFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              title="Source Location"
              description="You can select where your application source code will be located,
               for now the only available provider is GitHub."
            />
            <GitInfoLoader>
              {(gitInfo) => (
                <React.Fragment>
                  <RepositoryPicker
                    import={true}
                    gitInfo={gitInfo}
                    value={inputProps.value.repository}
                    onChange={(repository) => inputProps.onChange({...inputProps.value, repository})}
                  />
                  {inputProps.value.repository.name && (
                    <React.Fragment>
                      <DescriptiveHeader
                        description="A build image is needed to build and deploy you app on openshift.
                        We've detected a likly canditate for you to use but you could change it if you need."
                      />
                      <BuildImageAnalyzerLoader
                        repository={{org: inputProps.value.repository.org ? inputProps.value.repository.org : gitInfo.login,
                          name: inputProps.value.repository.name}}
                      >
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
            </GitInfoLoader>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
