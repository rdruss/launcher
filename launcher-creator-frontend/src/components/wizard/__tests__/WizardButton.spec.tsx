import * as React from 'react';
import { shallow } from 'enzyme';

import WizardButton from '../WizardButton';

describe('<WizardButton />', () => {
  it('renders the button with type next', () => {
    const component = shallow(<WizardButton type={'next'} />);
    expect(component.find('Button').contains('Next')).toBeTruthy();
    expect(component.find('Button Icon').prop('name')).toBe('angle-right');
    expect(component).toMatchSnapshot();
  });

  it('renders the button with type launch', () => {
    const component = shallow(<WizardButton type={'launch'} />);
    expect(component.find('Button').contains('Launch')).toBeTruthy();
    expect(component.find('Button Icon').prop('name')).toBe('check');
    expect(component).toMatchSnapshot();
  });

  it('renders the button disabled', () => {
    const component = shallow(<WizardButton type={'launch'} disabled={true} />);
    expect(component.find('Button').prop('disabled')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('call function when clicking', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<WizardButton type={'launch'} onClick={mockCallBack} />);
    component.find('Button').simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });
});

