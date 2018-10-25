import * as React from 'react';
import { Component } from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { AppState } from '../../states';
import NameStepContainer from './steps/NameStepContainer';
import Wizard from '../../../../shared/components/wizard';
import RuntimeStepContainer from './steps/RuntimeStepContainer';
import CapabilitiesStepContainer from './steps/CapabilitiesStepContainer';
import DeploymentStepContainer from './steps/DeploymentStepContainer';
import RepositoryStepContainer from './steps/RepositoryStepContainer';

import { wizardAction } from '../../actions';
import NextStepsZip from '../../../components/creator-wizard/next-steps/NextStepsZip';
import NextStepsOpenShift from '../../../components/creator-wizard/next-steps/NextStepsOpenShift';
import ProcessingApp from '../../../components/creator-wizard/next-steps/ProcessingApp';
import { StepStatus } from '../../../components/creator-wizard/StepProps';
import { findNextStep, findPrevStep } from './CreatorWizardHelper';
import { Projectile } from '../../../models/Projectile';
import * as _ from 'lodash';


interface StepDefinition {
  id: string;
  component: ConnectedComponentClass<any, any>;
}

const wizardStepsDefinition = {
  nameStep: {
    id: 'nameStep',
    component: NameStepContainer,
  },
  runtimeStep: {
    id: 'runtimeStep',
    component: RuntimeStepContainer,
  },
  capabilityStep: {
    id: 'capabilityStep',
    component: CapabilitiesStepContainer,
  },
  repositoryStep: {
    id: 'repositoryStep',
    component: RepositoryStepContainer,
  },
  deploymentStep: {
    id: 'deploymentStep',
    component: DeploymentStepContainer,
  },
};

interface Step {
  id: string;
  context: any;
  status: StepStatus;
}

interface CreatorWizardProps {
  submission: {
    payload?: any;
    loading: boolean;
    completed: boolean;
    error?: string;
    result?: any;
  };
  save(payload): void;
  submit(payload): void;
  reset(): void;
}

export interface StepState {
  id: string;
  completed: boolean;
  context?: any;
}

interface CreatorWizardState {
  current: string;
  steps: StepState[];
  projectile: Projectile;
}

function buildProjectile(stepState: StepState[]): Projectile {
  const byId = _.keyBy(stepState, 'id');
  return {
    name: _.get(byId[wizardStepsDefinition.nameStep.id], 'context.name'),
    runtime: _.get(byId[wizardStepsDefinition.runtimeStep.id], 'context.runtime.id'),
    capabilities: Array.from(_.get(byId[wizardStepsDefinition.capabilityStep.id], 'context.capabilities', [])),
    clusterId: _.get(byId[wizardStepsDefinition.deploymentStep.id], 'context.cluster.id'),
    projectName: _.get(byId[wizardStepsDefinition.nameStep.id], 'context.name'),
    gitOrganization: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.organization'),
    gitRepository: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.id'),
    deploymentLink: _.get(byId[wizardStepsDefinition.deploymentStep.id], 'context.cluster.consoleUrl'),
    repositoryLink: _.get(byId[wizardStepsDefinition.repositoryStep.id], 'context.repository.url'),
  };
}

class CreatorWizard extends Component<CreatorWizardProps, CreatorWizardState> {

  constructor(props) {
    super(props);
    this.state = {
      current: 'nameStep',
      steps: Object.keys(wizardStepsDefinition).map(id => ({ id, completed: false })),
      projectile: {},
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Wizard>
          {this.state.steps.map(step => {
            return React.createElement((wizardStepsDefinition[step.id] as StepDefinition).component, this.getStepProps(step));
          })}
        </Wizard>
        <ProcessingApp isOpen={this.props.submission.loading}/>
        <NextStepsZip
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'zip'}
          error={Boolean(this.props.submission.error)}
          downloadLink={this.props.submission.result && this.props.submission.result.downloadLink}
          onClose={this.reset}
        />
        <NextStepsOpenShift
          isOpen={this.props.submission.completed && this.props.submission.payload.target === 'launch'}
          error={Boolean(this.props.submission.error)}
          deploymentLink={this.state.projectile.deploymentLink}
          repositoryLink={this.state.projectile.repositoryLink}
          landingPageLink={this.state.projectile.deploymentLink}
          onClose={this.reset}
        />
      </React.Fragment>
    );
  }

  private isPreviousStepCompleted(step: string): boolean {
    const prevStep = this.getPreviousStep(step);
    if (!prevStep) {
      return true;
    }
    return prevStep.completed;
  }

  private getPreviousStep(step: string): StepState | undefined {
    const prevStep = findPrevStep(this.getStepIds(), step);
    return this.getStepState(prevStep);
  }

  private getStepState(id?: string): StepState | undefined {
    return this.state.steps.find(s => s.id === id);
  }

  private getStepIds() {
    return this.state.steps.map(s => s.id);
  }

  private getAsStep(stepState: StepState): Step {
    return {
      id: stepState.id,
      context: stepState.context,
      status: {
        completed: stepState.completed,
        locked: !this.isPreviousStepCompleted(stepState.id),
        selected: stepState.id === this.state.current,
        enabled: true,
      },
    };
  }

  private getStepProps(stepState: StepState) {
    const step = this.getAsStep(stepState);
    return ({
      key: step.id,
      stepId: step.id,
      status: step.status,
      context: step.context,
      projectile: this.state.projectile,
      updateStepContext: (payload) => this.updateStepContext(step.id, payload),
      select: () => this.selectStep(step.id),
      submit: (name?: string) => this.submitStep(step.id, name),
    });
  }

  private selectStep(id: string) {
    this.setState({ current: id });
  }

  private updateStepContext(id: string, payload: {context: any; completed: boolean}) {
    const index = this.state.steps.findIndex(s => s.id === id);
    if (index < 0) {
      return;
    }
    const newArray = [...this.state.steps];
    const prev = this.state.steps[index];
    newArray[index] = {
      ...prev,
      completed: payload.completed,
      context: payload.context,
    };
    this.setState({
      steps: newArray,
      projectile: buildProjectile(newArray),
    });
  }

  private submitStep(id: string, name: string | undefined) {
    switch (name) {
      case 'zip':
      case 'launch':
        this.props.submit({ target: name, projectile: this.state.projectile });
        break;
      default:
        const nextStep = findNextStep(this.getStepIds(), id);
        if (nextStep) {
          this.selectStep(nextStep);
        }
    }
  }

  private reset = () => {
    this.setState({
      current: 'nameStep',
      steps: Object.keys(wizardStepsDefinition).map(id => ({ id, completed: false })),
      projectile: {},
    });
    this.props.reset();
  }
}

const mapStateToProps = (state: AppState) => ({
  submission: state.wizard.submission
});

const mapDispatchToProps = (dispatch) => ({
  save: (payload) => dispatch(wizardAction.save(payload)),
  submit: (payload) => dispatch(wizardAction.submit(payload)),
  reset: () => dispatch(wizardAction.reset()),
});

const CreatorWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorWizard);

export default CreatorWizardContainer;
