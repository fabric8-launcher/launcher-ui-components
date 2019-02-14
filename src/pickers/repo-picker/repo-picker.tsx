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

import { InputProps } from "../../core/types";

export interface RepoPickerValue {
  org?: string;
  repo: string;
}

interface RepoPickerProps extends InputProps<RepoPickerValue> {
  gitInfo: GitInfo;
}

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

const validateRepository = (value: RepoPickerValue): boolean => {
  return !value.org || REPOSITORY_VALUE_REGEXP.test(value.org) && REPOSITORY_VALUE_REGEXP.test(value.repo);
}

const existingrepository = (props: RepoPickerProps): boolean => {
  return props.gitInfo.repositories.indexOf(`${props.value.org}/${props.value.repo}`) === -1
}

export function RepoPicker(props: RepoPickerProps) {
  return (
    <Grid>
      <GridItem span={4}>
        <img src={props.gitInfo.avatarUrl}></img>
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
              value={props.value.org}
              onChange={value => props.onChange({ ...props.value, org: value })}
              aria-label="Select organization">
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
            helperTextInvalid={
              !existingrepository(props) ? `Repository already exists ${props.value.org}/${props.value.repo}` : 'Invalid repository name'
            }
            isValid={validateRepository(props.value) && existingrepository(props)}
          >
            <TextInput
              isRequired
              type="text"
              id="ghRepo"
              name="ghRepo-name"
              placeholder="Select Repository"
              aria-describedby="Select Repository"
              onChange={value => props.onChange({ ...props.value, repo: value })}
              value={props.value.repo}
              isValid={validateRepository(props.value) && existingrepository(props)}
            />
          </FormGroup>
        </Form>
      </GridItem>
    </Grid>
  );
}