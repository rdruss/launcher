import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import NameStepContainer from './steps/NameStepContainer';
import Wizard from '../../../components/wizard/index';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

import { wizardAction } from '../../actions';
import NextStepsZip from '../../components/creator-wizard/NextStepsZip';
import NextStepsOpenShift from '../../components/creator-wizard/NextStepsOpenShift';
import ProcessingApp from '../../components/creator-wizard/ProcessingApp';
import { Projectile } from '../../models/Projectile';
import { getStepContextValue } from '../../reducers/wizardReducer';

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
  projectile: Projectile;
  selectStep: (stepId: string) => void;
  setSteps: (steps: string[], current: string) => void;
  submit: (payload) => void;
  submission: {
    payload?: any;
    loading: boolean;
    completed: boolean;
    error?: string;
    result?: any;
  };
}


class CreatorWizard extends Component<CreatorWizardProps> {

  public componentDidMount() {
    this.setInitialSteps();
  }

  public render() {
    return (
      <React.Fragment>
        <Wizard>
          {this.props.steps.map(stepId => {
            const comp = stepComponentById.get(stepId);
            return comp && React.createElement(comp, this.getStepProps(stepId));
          })}
        </Wizard>
        <ProcessingApp show={this.props.submission.loading}/>
        <NextStepsZip
          show={this.props.submission.completed && this.props.submission.payload.target === 'zip'}
          error={Boolean(this.props.submission.error)}
          downloadLink={this.props.submission.result && this.props.submission.result.downloadLink}
        />
        <NextStepsOpenShift show={this.props.submission.completed && this.props.submission.payload.target === 'openshift'}/>
      </React.Fragment>
    );
  }

  private setInitialSteps() {
    this.props.setSteps([
      WizardStepId.NAME_STEP,
      WizardStepId.RUNTIME_STEP,
      WizardStepId.CAPABILITIES_STEP,
    ], WizardStepId.NAME_STEP);
  }

  private setOpenShiftSteps() {
    this.props.setSteps([
      WizardStepId.NAME_STEP,
      WizardStepId.RUNTIME_STEP,
      WizardStepId.CAPABILITIES_STEP,
      WizardStepId.REPOSITORY_STEP,
      WizardStepId.DEPLOYMENT_STEP,
    ], WizardStepId.REPOSITORY_STEP);
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
      submit: (name?: string) => {
        if (stepId === WizardStepId.CAPABILITIES_STEP && name === 'openshift') {
          this.setOpenShiftSteps();
          return;
        }
        if (stepId === WizardStepId.CAPABILITIES_STEP && name === 'zip') {
          this.props.submit({ target: 'zip', projectile: this.props.projectile });
          return;
        }
        if (stepId === WizardStepId.DEPLOYMENT_STEP) {
          this.props.submit({ target: 'openshift', projectile: this.props.projectile});
          return;
        }
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
  submission: state.wizard.submission,
  projectile: {
    name: getStepContextValue(state, WizardStepId.NAME_STEP, 'name'),
    runtime: getStepContextValue(state, WizardStepId.RUNTIME_STEP, 'runtime.id'),
    capabilities: Array.from(getStepContextValue(state, WizardStepId.CAPABILITIES_STEP, 'capabilities', []))
  }
});

const mapDispatchToProps = (dispatch) => ({
  selectStep: (stepId: string) => dispatch(wizardAction.goToStep(stepId)),
  setSteps: (steps: string[], current: string) => dispatch(wizardAction.setSteps(steps, current)),
  submit: (payload) => dispatch(wizardAction.submit(payload)),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
