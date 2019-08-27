import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormPanel } from '../../core/form-panel/form-panel';

import { GAVPicker } from '../gav-picker';

storiesOf('Pickers', module)
  .add('GAVPicker ', () => {
    return (
      <FormPanel
        initialValue={{}}
        validator={GAVPicker.checkCompletion}
        onSave={action('save')}
        onCancel={action('cancel')}
      >
        {
          (inputProps) => (<GAVPicker.Element {...inputProps} showMoreOptions  mode="horizontal"/>)}
      </FormPanel>
    );
  });
