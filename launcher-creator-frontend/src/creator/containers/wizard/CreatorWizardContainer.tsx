import * as React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../../states/index';
import { WizardStepId } from '../../states/index';
import TitleStepContainer from './TitleStepContainer';
import Wizard from '../../../components/wizard/index';
import RuntimeStepContainer from './RuntimeStepContainer';
import CapabilitiesStepContainer from './CapabilitiesStepContainer';

interface CreatorWizardProps {
  current: WizardStepId;
  valid: boolean;
}

function CreatorWizard({ current }: CreatorWizardProps) {
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

const mapStateToProps = (state: AppState) => ({
  current: state.wizard.current,
  valid: state.wizard.valid,
});

const mapDispatchToProps = (dispatch) => ({
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
