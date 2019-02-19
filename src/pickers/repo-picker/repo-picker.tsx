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

export interface RepoPickerValue {
  org?: string;
  repo: string;
}

interface RepoPickerProps extends InputProps<RepoPickerValue | undefined> {
  gitInfo: GitInfo;
}

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export const isRepoPickerValueValid = (value?: RepoPickerValue): boolean => {
  return !!value && ((!value.org || REPOSITORY_VALUE_REGEXP.test(value.org)) && REPOSITORY_VALUE_REGEXP.test(value.repo));
};

export const defaultRepoPickerValue = undefined;

export const normalizeRepositoryPath = (value: RepoPickerValue) => {
  if (value.org) {
    return `${value.org}/${value.repo}`;
  }
  return value.repo;
};

const isExistingRepository = (repositories: string[], value: RepoPickerValue): boolean => {
  return !!value && isRepoPickerValueValid(value) && repositories.indexOf(normalizeRepositoryPath(value)) !== -1;
};

export function RepoPicker(props: RepoPickerProps) {
  const repo = props.value && props.value.repo || '';
  const helperRepoInvalid = !!props.value && isExistingRepository(props.gitInfo.repositories, props.value) ?
    `Repository already exists ${normalizeRepositoryPath(props.value)}` : 'Invalid repository name';
  const isRepoValid = !props.value || (isRepoPickerValueValid(props.value)
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
              onChange={value => props.onChange({...props.value, repo: value})}
              value={repo}
              isValid={isRepoValid}
            />
          </FormGroup>
        </Form>
      </GridItem>
    </Grid>
  );
}
