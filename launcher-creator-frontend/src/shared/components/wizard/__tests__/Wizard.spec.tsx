import * as React from 'react';
import { shallow } from 'enzyme';
import Wizard from '..';

describe('<Wizard />', () => {
  it('renders the wizard with one step', () => {
    const component = shallow(<Wizard><Wizard.Step title={'my first step'} selected={true} locked={false}/></Wizard>);
    expect(component).toMatchSnapshot();
  });

});

describe('<Wizard.Step />', () => {
  it('renders the step as completed', () => {
    const component = shallow(<Wizard.Step title={'my first step'} completed={true} />);
    expect(component).toMatchSnapshot();
  });
  it('renders the step as completed and locked', () => {
    const component = shallow(<Wizard.Step title={'my first step'} completed={true} locked={true} />);
    expect(component).toMatchSnapshot();
  });

});

describe('<Wizard.Button />', () => {
  it('renders the button with type next', () => {
    const component = shallow(<Wizard.Button type={'next'} />);
    expect(component).toMatchSnapshot();
    expect(component.find('Button').contains('Next')).toBeTruthy();
  });

  it('renders the button with type launch', () => {
    const component = shallow(<Wizard.Button type={'launch'} />);
    expect(component).toMatchSnapshot();
    expect(component.find('Button').contains('Launch')).toBeTruthy();
  });

  it('renders the button disabled', () => {
    const component = shallow(<Wizard.Button type={'launch'} disabled={true} />);
    expect(component).toMatchSnapshot();
    expect(component.find('Button').prop('isDisabled')).toBeTruthy();
  });

  it('call function when clicking', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<Wizard.Button type={'launch'} onClick={mockCallBack} />);
    component.find('Button').simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });
});