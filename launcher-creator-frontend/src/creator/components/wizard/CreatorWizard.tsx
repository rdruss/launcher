import * as React from 'react';

import { WizardStepId } from '../../states';
import TitleStepContainer from './title-step/TitleStepContainer';
import Wizard from '../../../components/wizard';
import RuntimeStepContainer from './runtime-step/RuntimeStepContainer';
import CapabilitiesStepContainer from './capabilities-step/CapabilitiesStepContainer';

interface CreatorWizardProps {
  current: WizardStepId;
  valid: boolean;
}

class CreatorWizard extends React.Component<CreatorWizardProps> {

  constructor(props) {
    super(props);
  }

  public render() {
    const { current } = this.props;
    return (
      <Wizard>
        <TitleStepContainer/>
        <RuntimeStepContainer/>
        <CapabilitiesStepContainer/>
        <Wizard.Step
          title={'Source Repository'}
          current={current === WizardStepId.REPOSITORY_STEP}
          locked={true}
        >
          <Wizard.Button type={'next'}/>
        </Wizard.Step>
        <Wizard.Step title={'What\'s next...'} locked>
          Now that your application has been set up, here is what you can do...
        </Wizard.Step>
      </Wizard>
    );
  }
}

export default CreatorWizard;
