import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { FormPanel } from '../../core/form-panel/form-panel';
import { DotNetSettingsPicker } from '../dotnet-settings-picker';

afterEach(cleanup);

describe('<DotNetSettingsPicker />', () => {
  it('renders the DotNetSettingsPicker correctly', () => {
    const comp = render(<DotNetSettingsPicker.Element value={{namespace: '', version: ''}} onChange={() => {}}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });

  it('show error for invalid data', () => {
    const handleSave = jest.fn();
    const comp = render(
      <FormPanel
        initialValue={{}}
        validator={DotNetSettingsPicker.checkCompletion}
        onSave={handleSave}
        onCancel={() => {}}
      >
        {(inputProps) => (<DotNetSettingsPicker.Element {...inputProps}/>)}
      </FormPanel>
    );

    const nameField = comp.getByLabelText('.Net namespace');
    fireEvent.change(nameField, { target: { value: 'invalid name' } });
    const versionField = comp.getByLabelText('.Net version');
    fireEvent.change(versionField, { target: { value: '1' } });
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
