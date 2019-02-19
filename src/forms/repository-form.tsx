import * as React from 'react';
import { isRepoPickerValueValid, RepoPicker, RepoPickerValue } from '../pickers/repo-picker/repo-picker';
import { DescriptiveHeader } from '../core/descriptive-header';
import { GitInfoLoader } from '../loaders/git-info-loader';
import { FormPanel } from '../core/form-panel/form-panel';

export interface RepositoryFormValue {
  repo?: RepoPickerValue;
}

export const defaultRepositoryFormValue = {};

export function isRepositoryFormValueValid(value: RepositoryFormValue) {
  return isRepoPickerValueValid(value.repo);
}

interface RepositoryFormProps {
  value: RepositoryFormValue;

  onSave?(value: RepositoryFormValue);

  onCancel?();
}

export function RepositoryForm(props: RepositoryFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isRepositoryFormValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              title="Repository"
              description="You can select where your application source code will be located."
            />
            <GitInfoLoader>
              {(gitInfo) => (
                <RepoPicker
                  gitInfo={gitInfo}
                  value={inputProps.value.repo}
                  onChange={(repo) => inputProps.onChange({...inputProps.value, repo})}
                />
              )}
            </GitInfoLoader>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
