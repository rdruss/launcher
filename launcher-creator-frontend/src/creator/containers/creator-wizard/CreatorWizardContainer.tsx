import * as React from 'react';
import { Component } from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
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
import { getWizardState, getWizardStepContextValue, getWizardStepState } from '../../reducers/wizardReducer';
import { StepStatus } from '../../components/creator-wizard/StepProps';
import { findNextStep, isPreviousStepCompleted } from './CreatorWizardHelper';

export enum WizardStepId {
  NAME_STEP = 'nameStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  REPOSITORY_STEP = 'repositoryStep',
  DEPLOYMENT_STEP = 'deploymentStep',
}

const stepComponentById = new Map<string, ConnectedComponentClass<any, any>>([
  [WizardStepId.NAME_STEP.valueOf(), NameStepContainer],
  [WizardStepId.RUNTIME_STEP.valueOf(), RuntimeStepContainer],
  [WizardStepId.CAPABILITIES_STEP.valueOf(), CapabilitiesStepContainer],
  [WizardStepId.REPOSITORY_STEP.valueOf(), RepositoryStepContainer],
  [WizardStepId.DEPLOYMENT_STEP.valueOf(), DeploymentStepContainer],
]);

interface Step {
  id: string;
  context: any;
  status: StepStatus;
}

interface CreatorWizardProps {
  steps: Step[];
  projectile: Projectile;
  submission: {
    payload?: any;
    loading: boolean;
    completed: boolean;
    error?: string;
    result?: any;
  };
  updateStepContext: (stepId: string, payload: {context: any; completed: boolean}) => void;
  selectStep: (stepId: string) => void;
  setSteps: (steps: string[], current: string) => void;
  submit: (payload) => void;
}

class CreatorWizard extends Component<CreatorWizardProps> {

  public componentDidMount() {
    this.setInitialSteps();
  }

  public render() {
    return (
      <React.Fragment>
        <Wizard>
          {this.props.steps.map(step => {
            const comp = stepComponentById.get(step.id);
            return comp && React.createElement(comp, this.getStepProps(step));
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

  private getStepProps(step: Step) {
    return ({
      key: step.id,
      stepId: step.id,
      status: step.status,
      context: step.context,
      updateStepContext: (payload) => this.props.updateStepContext(step.id, payload),
      select: () => this.props.selectStep(step.id),
      submit: (name?: string) => {
        if (step.id === WizardStepId.CAPABILITIES_STEP && name === 'openshift') {
          this.setOpenShiftSteps();
          return;
        }
        if (step.id === WizardStepId.CAPABILITIES_STEP && name === 'zip') {
          this.props.submit({ target: 'zip', projectile: this.props.projectile });
          return;
        }
        if (step.id === WizardStepId.DEPLOYMENT_STEP) {
          this.props.submit({ target: 'openshift', projectile: this.props.projectile});
          return;
        }
        const nextStep = findNextStep(this.props.steps.map(s => s.id), step.id);
        if (nextStep) {
          this.props.selectStep(nextStep);
        }
      }
    });
  }
}

const mapStateToProps = (state: AppState) => ({
  steps: getWizardState(state).steps.map(id => ({
    id,
    context: getWizardStepState(state, id).context,
    status: {
      completed: getWizardStepState(state, id).completed,
      locked: !isPreviousStepCompleted(state, id),
      selected: getWizardState(state).current === id,
    },
  })),
  submission: state.wizard.submission,
  projectile: {
    name: getWizardStepContextValue(state, WizardStepId.NAME_STEP, 'name'),
    runtime: getWizardStepContextValue(state, WizardStepId.RUNTIME_STEP, 'runtime.id'),
    capabilities: Array.from(getWizardStepContextValue(state, WizardStepId.CAPABILITIES_STEP, 'capabilities', []))
  }
});

const mapDispatchToProps = (dispatch) => ({
  updateStepContext: (stepId: string, payload) => dispatch(wizardAction.updateStepContext(stepId, payload)),
  selectStep: (stepId: string) => dispatch(wizardAction.goToStep(stepId)),
  setSteps: (steps: string[], current: string) => dispatch(wizardAction.setSteps(steps, current)),
  submit: (payload) => dispatch(wizardAction.submit(payload)),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
