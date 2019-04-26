import * as React from 'react';
import 'jest-dom/extend-expect';
import { Wizard, WizardStep, WizardButton } from '../wizard';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(() => cleanup());

describe('<Wizard />', () => {
  it('renders the wizard with one step', () => {
    const component = render(<Wizard><WizardStep title={'my first step'} selected={true} locked={false} /></Wizard>);
    expect(component).toMatchSnapshot();
  });
});

describe('<Wizard.Step />', () => {
  it('renders the step as completed', () => {
    const component = render(<WizardStep title={'my first step'} completed={true} />);
    expect(component).toMatchSnapshot();
  });
  it('renders the step as completed and locked', () => {
    const component = render(<WizardStep title={'my first step'} completed={true} locked={true} />);
    expect(component).toMatchSnapshot();
  });

});

describe('<Wizard.Button />', () => {
  it('renders the button with type next', () => {
    const component = render(<WizardButton title={'Go to next'} />);
    expect(component).toMatchSnapshot();
    expect(component.getByLabelText('Go to next button')).toBeDefined();
  });

  it('renders the button with type launch', () => {
    const component = render(<WizardButton />);
    expect(component).toMatchSnapshot();
    expect(component.getByLabelText('Next button')).toBeDefined();
  });

  it('renders the button disabled', () => {
    const component = render(<WizardButton disabled={true} />);
    expect(component).toMatchSnapshot();
    expect(component.getByLabelText('Next button')).toHaveAttribute('disabled');
  });

  it('call function when clicking', () => {
    const mockCallBack = jest.fn();
    const component = render(<WizardButton onClick={mockCallBack} />);
    fireEvent.click(component.getByLabelText('Next button'));
    expect(mockCallBack).toHaveBeenCalled();
  });
});