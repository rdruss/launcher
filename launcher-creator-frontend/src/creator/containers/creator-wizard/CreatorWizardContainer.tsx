import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import TitleStepContainer from './steps/TitleStepContainer';
import Wizard from '../../../components/wizard/index';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import { WizardStepId } from '../../states/WizardState';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

interface CreatorWizardProps {
  current: WizardStepId;
  valid: boolean;
}

function CreatorWizard({ current }: CreatorWizardProps) {
  return (
    <Wizard>
      <TitleStepContainer stepId={WizardStepId.TITLE_STEP}/>
      <RuntimeStepContainer stepId={WizardStepId.RUNTIME_STEP}/>
      <CapabilitiesStepContainer stepId={WizardStepId.CAPABILITIES_STEP}/>
      <RepositoryStepContainer stepId={WizardStepId.REPOSITORY_STEP}/>
      <DeploymentStepContainer stepId={WizardStepId.DEPLOYMENT_STEP}/>
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
