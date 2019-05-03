import React, { useState, FormEvent } from 'react';
import { useLauncherClient } from '../../contexts/launcher-client-context';
import { InlineTextInput } from '../inline-text-input/inline-text-input';
import { NAME_REGEX } from '../../flows/launch-flow';

interface ProjectNameInputProps {
  prefix: string;
  value?: string;
  onChange?(value: string, event: FormEvent<HTMLInputElement>): void;
}

export function ProjectNameInput(props: ProjectNameInputProps) {
  const client = useLauncherClient();
  const [warning, setWarning] = useState();
  const validateProjectName = async (projectName: string) => {
    const result = await client.ocExistsProject(projectName);
    if (result.exists) {
      setWarning('Warning this project exists! Make sure you are the owner.');
    } else {
      setWarning(undefined);
    }
  }
  return (
    <InlineTextInput
      type="text"
      id="appname"
      name="appname"
      placeholder="Name of the project"
      aria-label="Application Project name"
      title="Application name"
      value={props.value || ''}
      isValid={NAME_REGEX.test(props.value || '')}
      onBlur={() => validateProjectName(props.value || '')}
      warning={warning}
      {...props}
    />
  );
}
