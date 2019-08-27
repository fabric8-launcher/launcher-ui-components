import React from 'react';
import { optionalBool } from '../core/stuff';
import { LaunchTextInput } from '../core/text-input/text-input';
import { TogglePanel } from '../core/toggle-panel/toggle-panel';
import { InputProps, Picker } from '../core/types';
import './gav-picker.scss';

export interface GAVPickerValue {
  groupId?: string;
  artifactId?: string;
  version?: string;
  name?: string;
  description?: string;
  packageName?: string;
}

type SettingField = 'groupId' | 'artifactId' | 'version' | 'description' | 'packageName';

interface GAVPickerProps extends InputProps<GAVPickerValue> {
  showMoreOptions?: boolean;
  visibleFields?: SettingField[];
  mode?: 'vertical' | 'horizontal';
}

const VALUE_REGEXP = /^[a-z][a-z0-9-.]{3,63}$/;

export const GAVPicker: Picker<GAVPickerProps, GAVPickerValue> = {
  checkCompletion: value => !!value.groupId && VALUE_REGEXP.test(value.groupId)
    && !!value.artifactId && VALUE_REGEXP.test(value.artifactId) && !!value.version,
  Element: props => {
    const isValid = (value?: string) => !!value && VALUE_REGEXP.test(value || '');
    const visibleFields = props.visibleFields ? new Set(props.visibleFields)
      : new Set(['groupId', 'artifactId', 'version', 'description', 'packageName']);
    const mode = props.mode || 'vertical';
    return (
      <div className={`gav-picker ${mode}`}>
        <div className="base-settings pf-c-form">
          {visibleFields.has('groupId') && <LaunchTextInput
            label="Group"
            isRequired
            helperTextInvalid="Please provide a valid groupId"
            type="text"
            id="groupId"
            name="groupId"
            aria-label="Edit groupId"
            value={props.value.groupId || ''}
            onChange={value => props.onChange({ ...props.value, groupId: value })}
            pattern={VALUE_REGEXP.source}
            isValid={isValid(props.value.groupId)}
          />}
          {visibleFields.has('artifactId') && <LaunchTextInput
            label="Artifact"
            isRequired
            helperTextInvalid="Please provide a valid artifactId"
            type="text"
            id="artifactId"
            name="artifactId"
            aria-label="Edit artifactId"
            value={props.value.artifactId || ''}
            onChange={value => props.onChange({ ...props.value, artifactId: value })}
            pattern={VALUE_REGEXP.source}
            isValid={isValid(props.value.artifactId)}
          />}
        </div>

        {optionalBool(props.showMoreOptions, true) && (
          <TogglePanel id="gav-extended" mode={mode} openLabel="Configure more options">
            <div className="extended-settings pf-c-form">
              {visibleFields.has('version') && <LaunchTextInput
                label="Version"
                helperTextInvalid="Please provide a version number"
                isRequired
                type="text"
                id="version"
                name="version"
                aria-label="Edit version"
                value={props.value.version || ''}
                onChange={value => props.onChange({ ...props.value, version: value })}
                isValid={!!props.value.version}
              />}
              {visibleFields.has('description') && <LaunchTextInput
                label="Description"
                helperTextInvalid="Please provide a description"
                isRequired
                type="text"
                id="description"
                name="description"
                aria-label="Edit description"
                value={props.value.description || ''}
                onChange={value => props.onChange({ ...props.value, description: value })}
                isValid={true}
              />}
              {visibleFields.has('packageName') && <LaunchTextInput
                label="Package Name"
                helperTextInvalid="Please provide a package name"
                isRequired
                type="text"
                id="packageName"
                name="packageName"
                aria-label="Edit package name"
                value={props.value.packageName || ''}
                onChange={value => props.onChange({ ...props.value, packageName: value })}
                isValid={true}
              />}
            </div>
          </TogglePanel>
        )}
      </div>
    );
  }
};
