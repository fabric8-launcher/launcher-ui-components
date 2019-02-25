import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import ItemPicker from '../item-picker';
import { mockItems } from './mock-items';

afterEach(cleanup);

describe('<ItemPicker />', () => {
  it('renders the ItemPicker correctly', () => {
    const comp = render(<ItemPicker group="test" value="value" onChange={() => {}} items={mockItems} />);
    expect(comp.asFragment()).toMatchSnapshot();
  });

  it('pick one of the items correctly', () => {
    let value: string = '';
    const change = (picked: string) => value = picked;
    const comp = render(<ItemPicker group="test" value="value" onChange={change} items={mockItems} />);
    const item1Radio = comp.getByLabelText('Choose item1 as test');
    fireEvent.click(item1Radio);
    expect(value).toBe('item1');
  });
});
