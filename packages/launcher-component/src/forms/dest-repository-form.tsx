import * as React from 'react';
import { isUserRepositoryPickerValueValid, UserRepositoryPicker, UserRepositoryPickerValue } from '../pickers/user-repository-picker';
import { DescriptiveHeader } from '../core/stuff';
import { GitInfoLoader } from '../loaders/git-info-loader';
import { FormPanel } from '../core/form-panel/form-panel';

export interface DestRepositoryFormValue {
  repository: UserRepositoryPickerValue;
}

export const defaultDestRepositoryFormValue = { repository: {}};

export function isDestRepositoryFromValueValid(value: DestRepositoryFormValue) {
  return isUserRepositoryPickerValueValid(value.repository);
}

interface DestRepositoryFormProps {
  value: DestRepositoryFormValue;

  onSave?(value: DestRepositoryFormValue);

  onCancel?();
}

export function DestRepositoryForm(props: DestRepositoryFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isDestRepositoryFromValueValid}
      onCancel={props.onCancel}
    >
      {
        (inputProps) => (
          <React.Fragment>
            <DescriptiveHeader
              description="You can select where your application source code will be located,
               for now the only available provider is GitHub."
            />
            <GitInfoLoader>
              {(gitInfo) => (
                <UserRepositoryPicker
                  gitInfo={gitInfo}
                  value={inputProps.value.repository}
                  onChange={(repository) => inputProps.onChange({...inputProps.value, repository})}
                />
              )}
            </GitInfoLoader>
          </React.Fragment>
        )}
    </FormPanel>
  );
}
