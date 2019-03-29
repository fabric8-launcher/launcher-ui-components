import React, { Fragment } from 'react';
import { InputProps, Picker } from '../core/types';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';

export interface BranchListPickerValue {
  branch?: string;
}

interface BranchListProps extends InputProps<BranchListPickerValue> {
  branchList: string[];
}

export const BranchListPicker: Picker<BranchListProps, BranchListPickerValue> = {
  checkCompletion: value => !!value.branch,
  Element: props => {
    return (
      <Fragment>
        <FormSelect
          id={'branches-select'}
          value={props.value.branch || ''}
          onChange={value => props.onChange({ ...props.value, branch: value })}
          aria-label="Select Branch"
        >
          {props.branchList.map((branch, index) => (
            <FormSelectOption
              key={index}
              value={branch}
              label={branch}
            />
          ))
          }
        </FormSelect>
      </Fragment>
    );
  }
};
