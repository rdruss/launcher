import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import NameStepContainer from './steps/NameStepContainer';
import Wizard from '../../../components/wizard/index';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

import { wizardAction } from '../../actions';
import { Component } from 'react';
import * as _ from 'lodash';

export enum WizardStepId {
  NAME_STEP = 'nameStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  REPOSITORY_STEP = 'repositoryStep',
  DEPLOYMENT_STEP = 'deploymentStep',
}

const stepComponentById = new Map([
  [WizardStepId.NAME_STEP.valueOf(), NameStepContainer],
  [WizardStepId.RUNTIME_STEP.valueOf(), RuntimeStepContainer],
  [WizardStepId.CAPABILITIES_STEP.valueOf(), CapabilitiesStepContainer],
  [WizardStepId.REPOSITORY_STEP.valueOf(), RepositoryStepContainer],
  [WizardStepId.DEPLOYMENT_STEP.valueOf(), DeploymentStepContainer],
]);

interface CreatorWizardProps {
  steps: string[];
  selectStep: (stepId: string) => void;
  setSteps: (steps: string[], current: string) => void;
}


class CreatorWizard extends Component<CreatorWizardProps> {

  public componentDidMount() {
    this.props.setSteps(_.values(WizardStepId), WizardStepId.NAME_STEP);
  }

  public render() {
    return (
      <Wizard>
        {this.props.steps.map(stepId => {
          const comp = stepComponentById.get(stepId);
          return comp && React.createElement(comp, this.getStepProps(stepId));
        })}
      </Wizard>
    );
  }

  private findNextStep(stepId: string): string | undefined {
    const index = this.props.steps.indexOf(stepId);
    if(index < 0) {
      throw new Error(`Invalid step: ${stepId}`);
    }
    if (index === this.props.steps.length - 1) {
      return undefined;
    }
    return this.props.steps[index + 1];
  }

  private getStepProps(stepId: string) {
    return ({
      key: stepId,
      stepId,
      select: () => this.props.selectStep(stepId),
      submit: () => {
        const nextStep = this.findNextStep(stepId);
        if (nextStep) {
          this.props.selectStep(nextStep);
        }
      }
    });
  }

}

const mapStateToProps = (state: AppState) => ({
  steps: state.wizard.steps,
});

const mapDispatchToProps = (dispatch) => ({
  selectStep: (stepId: string) => dispatch(wizardAction.goToStep(stepId)),
  setSteps: (steps: string[], current: string) => dispatch(wizardAction.setSteps(steps, current)),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
