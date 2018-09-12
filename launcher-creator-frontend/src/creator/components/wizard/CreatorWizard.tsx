import * as React from 'react';

import { WizardStepId } from '../../states';
import TitleStepContainer from './title-step/TitleStepContainer';
import Lizard from '../../../components/lizard';
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
      <Lizard>
        <TitleStepContainer/>
        <RuntimeStepContainer/>
        <CapabilitiesStepContainer/>
        <Lizard.Step
          title={'Source Repository'}
          current={current === WizardStepId.REPOSITORY_STEP}
          locked={true}
        >
          <Lizard.Button type={'next'}/>
        </Lizard.Step>
        <Lizard.Step title={'What\'s next...'} locked>
          Now that your application has been set up, here is what you can do...
        </Lizard.Step>
      </Lizard>
    );
  }
}

export default CreatorWizard;
