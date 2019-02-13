import React from 'react';
import { Grid, GridItem, Form, FormGroup, TextInput } from '@patternfly/react-core';

import { GitInfo } from 'launcher-client';

import { InputProps } from "../../core/types";

export interface RepoPickerValue {
  org?: string;
  repo?: string;
}

interface RepoPickerProps extends InputProps<RepoPickerValue> {
  gitInfo: GitInfo;
}

export function RepoPicker(props: RepoPickerProps) {
  return (
    <Grid>
      <GridItem span={4}>
        <img src={props.gitInfo.avatarUrl} width="135px"></img>
      </GridItem>
      <GridItem span={8}>
        <h3>Authorized Account Information</h3>
        <Form>
          <FormGroup
            label="Location"
            isRequired
            fieldId="ghOrg"
            helperText="Select organization"
          >
            <TextInput
              isRequired
              type="text"
              id="ghOrg"
              name="ghOrg-name"
              placeholder="Select organization"
              aria-describedby="Select organization"
              value={'value1'}
            />
          </FormGroup>
          <FormGroup
            label="Repository"
            isRequired
            fieldId="ghRepo"
            helperText="Select Repository"
          >
            <TextInput
              isRequired
              type="text"
              id="ghRepo"
              name="ghRepo-name"
              placeholder="Select Repository"
              aria-describedby="Select Repository"
              value={'value1'}
            />
          </FormGroup>
        </Form>
      </GridItem>
    </Grid>
  );
}