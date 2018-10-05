import * as React from 'react';
import { shallow } from 'enzyme';
import Wizard from '../index';

describe('<Wizard />', () => {
  it('renders the wizard with one step', () => {
    const component = shallow(<Wizard><Wizard.Step title={'my first step'} selected={true} locked={false}/></Wizard>);
    expect(component).toMatchSnapshot();
  });

});

