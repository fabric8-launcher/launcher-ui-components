import * as React from 'react';
import { useState } from 'react';
import { Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { InputProps } from '../types';

interface FormPanelProps<T> {
  value: T;
  children: (inputProps: InputProps<T>) => any;
  isValid?(value: T): boolean;

  onSave?(value: any);
  onCancel?();
}

export function FormPanel<T>(props: FormPanelProps<T>) {

  const [value, onChange] = useState<T>(props.value);

  const onSave = () => {
    if (props.onSave) {
      props.onSave(value);
    }
  };

  const onCancel = () => {
    onChange(props.value);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <div className="form-panel" style={{padding: '20px'}}>
      {props.children({value, onChange})}
      <Toolbar style={{marginTop: '20px'}}>
        <ToolbarGroup>
          <Button variant="primary" onClick={onSave} isDisabled={props.isValid && !props.isValid(value)}>Save</Button>
        </ToolbarGroup>
        <ToolbarGroup>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
}
