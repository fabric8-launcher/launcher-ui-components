import * as React from 'react';
import { isRepositoryPickerValueValid, RepositoryPicker, RepositoryPickerValue } from '../pickers/repository-picker/repository-picker';
import { DescriptiveHeader } from '../core/descriptive-header';
import { GitInfoLoader } from '../loaders/git-info-loader';
import { FormPanel } from '../core/form-panel/form-panel';

export interface SrcLocationFormValue {
  repository?: RepositoryPickerValue;
}

export const defaultSrcLocationFormValue = {};

export function isSrcLocationFormValueValid(value: SrcLocationFormValue) {
  return isRepositoryPickerValueValid(value.repository);
}

interface SrcLocationFormProps {
  value: SrcLocationFormValue;

  onSave?(value: SrcLocationFormValue);

  onCancel?();
}

export function SrcLocationForm(props: SrcLocationFormProps) {
  return (
    <FormPanel
      value={props.value}
      onSave={props.onSave}
      isValid={isSrcLocationFormValueValid}
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
                <RepositoryPicker
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
