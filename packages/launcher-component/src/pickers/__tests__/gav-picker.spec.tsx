import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { FormPanel } from '../../core/form-panel/form-panel';

import { GAVPicker } from '../gav-picker';

afterEach(cleanup);

describe('<GAVPicker />', () => {
  it('renders the GAVPicker correctly', () => {
    const comp = render(<GAVPicker.Element value={{groupId: '', version: '', artifactId: ''}} onChange={() => {}}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });

  it('show error for invalid data', () => {
    const handleSave = jest.fn();
    const comp = render(
      <FormPanel
        initialValue={{}}
        validator={GAVPicker.checkCompletion}
        onSave={handleSave}
        onCancel={() => {}}
      >
        {(inputProps) => (<GAVPicker.Element {...inputProps} showMoreOptions />)}
      </FormPanel>
    );

    const groupIdField = comp.getByLabelText('Edit groupId');
    fireEvent.change(groupIdField, { target: { value: 'invalid value' } });
    const artifactIdField = comp.getByLabelText('Edit artifactId');
    fireEvent.change(artifactIdField, { target: { value: 'invalid value' } });
    const toggleButton = comp.getByLabelText('Toggle panel');
    fireEvent.click(toggleButton);
    const versionField = comp.getByLabelText('Edit version');
    fireEvent.change(versionField, { target: { value: '1' } });
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
