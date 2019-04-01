import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { ExamplePicker } from '../example-picker';
import { ExampleMission } from 'launcher-client';
import { FormPanel } from '../../core/form-panel/form-panel';

afterEach(cleanup);

describe('<ExamplePicker />', () => {
  it('renders the ExamplePicker correctly', () => {
    const comp = render(<ExamplePicker.Element missions={missions} value={{}} onChange={() => {}}/>);
    expect(comp.asFragment()).toMatchSnapshot();
  });

  it('show the version dropdown', () => {
    const handleSave = jest.fn();
    const comp = render(
      <FormPanel
        initialValue={{}}
        validator={ExamplePicker.checkCompletion}
        onSave={handleSave}
        onCancel={() => {}}
      >
        {(inputProps) => (<ExamplePicker.Element missions={missions} {...inputProps}/>)}
      </FormPanel>
    );
    const missionRadio = comp.getByLabelText('Choose Mission Name as mission');
    fireEvent.click(missionRadio);
    expect(comp.getByLabelText('Select Runtime')).toBeDefined();
    fireEvent.change(comp.getByLabelText('Select Runtime'), { target: { value: 'nodejs' } });
    expect(comp.getByDisplayValue('10.x (Community)')).toBeDefined();
    fireEvent.change(comp.getByLabelText('Select Version'), { target: { value: 'community' } });
    fireEvent.click(comp.getByText('Save'));
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(comp.asFragment()).toMatchSnapshot();
  });

});

const missions: ExampleMission[] = [
  {id: 'test', description: 'bla', name: 'Mission Name', metadata: {}, runtime: [
    {id: 'nodejs', name: 'Node', icon: '', versions: [
      {id: 'community', name: '10.x (Community)'}
    ]}
  ]}
];
