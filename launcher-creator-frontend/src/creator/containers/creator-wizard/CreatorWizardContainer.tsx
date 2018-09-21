import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import TitleStepContainer from './steps/TitleStepContainer';
import Wizard from '../../../components/wizard/index';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import { WizardStepId } from '../../states/WizardState';
import DeploymentStepContainer from './steps/DeploymentStepContainer';

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
      <DeploymentStepContainer />
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
