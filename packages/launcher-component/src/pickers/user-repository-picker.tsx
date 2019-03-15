import React from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption, Grid, GridItem, TextInput } from '@patternfly/react-core';
import { GitInfo } from 'launcher-client';

import { InputProps, Picker } from '../core/types';
import style from './repository-picker.module.scss';

const REPOSITORY_VALUE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export interface UserRepositoryPickerValue {
  org?: string;
  name?: string;
}

interface UserRepositoryPickerProps extends InputProps<UserRepositoryPickerValue> {
  gitInfo: GitInfo;
}

export function valueToPath(value: UserRepositoryPickerValue) {
  if (value.org) {
    return `${value.org}/${value.name}`;
  }
  return value.name || '';
}

const isExistingRepository = (repositories: string[], value: UserRepositoryPickerValue): boolean => {
  return repositories.indexOf(valueToPath(value)) !== -1;
};

export const UserRepositoryPicker: Picker<UserRepositoryPickerProps, UserRepositoryPickerValue> = {
  checkCompletion: value => (!value.org || REPOSITORY_VALUE_REGEXP.test(value.org)) && REPOSITORY_VALUE_REGEXP.test(value.name || ''),
  Element: props => {
    const name = props.value.name || '';
    const org = props.value.org || props.gitInfo.organizations[0];
    const helperRepoInvalid = isExistingRepository(props.gitInfo.repositories, props.value) ?
      `Repository already exists ${valueToPath(props.value)}` : 'Invalid repository name';
    const isRepoValid = UserRepositoryPicker.checkCompletion(props.value)
      && !isExistingRepository(props.gitInfo.repositories, props.value);
    return (
      <Grid>
        <GridItem span={4} style={{margin: 'auto'}}>
          <img src={props.gitInfo.avatarUrl} className={style.avatar}/>
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
                onChange={value => props.onChange({...props.value, org: value})}
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
              <TextInput
                isRequired
                type="text"
                id="ghRepo"
                name="ghRepo-name"
                placeholder="Select Repository"
                aria-describedby="Select Repository"
                onChange={value => props.onChange({...props.value, name: value})}
                value={name}
                pattern={REPOSITORY_VALUE_REGEXP.source}
                title="Valid repository name"
              />
            </FormGroup>
          </Form>
        </GridItem>
      </Grid>
    );
  }
};
