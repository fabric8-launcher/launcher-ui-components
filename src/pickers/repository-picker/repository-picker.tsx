import React from 'react';
import {
  Grid,
  GridItem,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption
} from '@patternfly/react-core';

import { GitInfo } from 'launcher-client';

import { InputProps } from '../../core/types';

export interface RepositoryPickerValue {
  org?: string;
  name: string;
}

interface RepositoryPickerProps extends InputProps<RepositoryPickerValue | undefined> {
  gitInfo: GitInfo;
}

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export const isRepositoryPickerValueValid = (value?: RepositoryPickerValue): boolean => {
  return !!value && ((!value.org || REPOSITORY_VALUE_REGEXP.test(value.org)) && REPOSITORY_VALUE_REGEXP.test(value.name));
};

export const defaultRepoPickerValue = undefined;

export const normalizeRepositoryPath = (value: RepositoryPickerValue) => {
  if (value.org) {
    return `${value.org}/${value.name}`;
  }
  return value.name;
};

const isExistingRepository = (repositories: string[], value: RepositoryPickerValue): boolean => {
  return !!value && isRepositoryPickerValueValid(value) && repositories.indexOf(normalizeRepositoryPath(value)) !== -1;
};

export function RepositoryPicker(props: RepositoryPickerProps) {
  const name = props.value && props.value.name || '';
  const helperRepoInvalid = !!props.value && isExistingRepository(props.gitInfo.repositories, props.value) ?
    `Repository already exists ${normalizeRepositoryPath(props.value)}` : 'Invalid repository name';
  const isRepoValid = !props.value || (isRepositoryPickerValueValid(props.value)
    && !isExistingRepository(props.gitInfo.repositories, props.value));
  return (
    <Grid>
      <GridItem span={4}>
        <img src={props.gitInfo.avatarUrl}/>
      </GridItem>
      <GridItem span={8}>
        <h3>Choose a Repository</h3>
        <Form>
          <FormGroup
            label="Location"
            isRequired
            fieldId="ghOrg"
          >
            <FormSelect
              id="ghOrg"
              value={props.value && props.value.org}
              onChange={value => props.onChange({...props.value, org: value})}
              aria-label="Select organization"
            >
              <FormSelectOption
                value={props.gitInfo.login}
                label={props.gitInfo.login}
              />
              {props.gitInfo.organizations.map((org, index) => (
                <FormSelectOption
                  key={index}
                  value={org}
                  label={org}
                />
              ))}
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Repository"
            isRequired
            fieldId="ghRepo"
            helperTextInvalid={helperRepoInvalid}
            isValid={isRepoValid}
          >
            <TextInput
              isRequired
              type="text"
              id="ghRepo"
              name="ghRepo-name"
              placeholder="Select Repository"
              aria-describedby="Select Repository"
              onChange={value => props.onChange({...props.value, name: value})}
              value={name}
              isValid={isRepoValid}
            />
          </FormGroup>
        </Form>
      </GridItem>
    </Grid>
  );
}
