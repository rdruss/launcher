import * as React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../index';

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

