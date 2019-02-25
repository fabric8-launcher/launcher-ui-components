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
import * as style from './repository-picker.module.scss';

export interface RepositoryPickerValue {
  org?: string;
  name?: string;
}

interface RepositoryPickerProps extends InputProps<RepositoryPickerValue> {
  gitInfo: GitInfo;
  import?: boolean;
}

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export const isRepositoryPickerValueValid = (value: RepositoryPickerValue): boolean => {
  return (!value.org || REPOSITORY_VALUE_REGEXP.test(value.org)) && REPOSITORY_VALUE_REGEXP.test(value.name || '');
};

export const defaultRepoPickerValue = {};

export const normalizeRepositoryPath = (value: RepositoryPickerValue) => {
  if (value.org) {
    return `${value.org}/${value.name}`;
  }
  return value.name || '';
};

const isExistingRepository = (repositories: string[], value: RepositoryPickerValue): boolean => {
  return repositories.indexOf(normalizeRepositoryPath(value)) !== -1;
};

export function RepositoryPicker(props: RepositoryPickerProps) {
  const name = props.value.name || '';
  const org = props.value.org || props.gitInfo.organizations[0];
  const helperRepoInvalid = isExistingRepository(props.gitInfo.repositories, props.value) ?
    `Repository already exists ${normalizeRepositoryPath(props.value)}` : 'Invalid repository name';
  const isRepoValid = props.import || (isRepositoryPickerValueValid(props.value)
    && !isExistingRepository(props.gitInfo.repositories, props.value));
  return (
    <Grid>
      <GridItem span={4} style={{margin: 'auto'}}>
        <img src={props.gitInfo.avatarUrl} className={style.avatar} />
        <p><b>{props.gitInfo.login}</b></p>
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
              value={org}
              onChange={value => props.onChange({ ...props.value, org: value })}
              aria-label="Select organization"
            >
              <FormSelectOption
                value={props.gitInfo.login}
                label={props.gitInfo.login}
              />
              {props.gitInfo.organizations.map((o, index) => (
                <FormSelectOption
                  key={index}
                  value={o}
                  label={o}
                />)
              )}
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Repository"
            isRequired
            fieldId="ghRepo"
            helperTextInvalid={helperRepoInvalid}
            isValid={isRepoValid}
          >
            {!props.import &&
              <TextInput
                isRequired
                type="text"
                id="ghRepo"
                name="ghRepo-name"
                placeholder="Select Repository"
                aria-describedby="Select Repository"
                onChange={value => props.onChange({ ...props.value, name: value })}
                value={name}
                isValid={isRepoValid}
              />
            }
            {props.import &&
              <FormSelect
                id="ghRepo"
                value={name}
                onChange={value => props.onChange({ ...props.value, name: value })}
                aria-label="Select Repository"
              >
                <FormSelectOption
                  key={-1}
                  value=""
                  label="Select a repository"
                />
                {props.gitInfo.repositories.filter(repo => repo.startsWith(props.value.org!))
                  .map(repo => repo.substr(props.value.org!.length + 1))
                  .map((repo, index) => (
                    <FormSelectOption
                      key={index}
                      value={repo}
                      label={repo}
                    />)
                  )}
              </FormSelect>
            }
          </FormGroup>
        </Form>
      </GridItem>
    </Grid>
  );
}
