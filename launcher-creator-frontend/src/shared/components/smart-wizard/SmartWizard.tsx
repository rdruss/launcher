import * as React from 'react';
import { Component } from 'react';
import { ConnectedComponentClass } from 'react-redux';
import { findNextStep, findPrevStep } from './SmartWizardHelper';
import Wizard from '../wizard';

export interface StepDefinition {
  id: string;
  component: ConnectedComponentClass<any, any>;
}

export interface WizardDefinition {
  [id: string]:StepDefinition;
}

interface SmartWizardProps {
  id: string;
  definition: WizardDefinition;
  buildProjectile(steps: StepState[]): any;
  save(payload): void;
  submit(payload): void;
  reset(): void;
}

export interface StepState {
  id: string;
  completed: boolean;
  context?: any;
}

interface SmartWizardState {
  current: string;
  steps: StepState[];
  projectile: any;
}

class SmartWizard extends Component<SmartWizardProps, SmartWizardState> {

  constructor(props) {
    super(props);
    this.state = {
      current: 'nameStep',
      steps: this.getInitialSteps(),
      projectile: {},
    };
  }

  public componentDidUpdate(prevProps: SmartWizardProps) {
    if (this.props.id !== prevProps.id) {
      this.reset();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Wizard>
          {this.state.steps.map(step => {
            return React.createElement((this.props.definition[step.id] as StepDefinition).component, this.getStepProps(step));
          })}
        </Wizard>
      </React.Fragment>
    );
  }

  private reset = () => {
    this.setState({
      current: 'nameStep',
      steps: this.getInitialSteps(),
      projectile: {},
    });
    this.props.reset();
  }

  private getInitialSteps(): StepState[] {
    return Object.keys(this.props.definition).map(id => ({id, completed: false}));
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

  private getStepProps(stepState: StepState) {
    return ({
      key: stepState.id,
      stepId: stepState.id,
      status: {
        completed: stepState.completed,
        locked: !this.isPreviousStepCompleted(stepState.id),
        selected: stepState.id === this.state.current,
        enabled: true,
      },
      context: stepState.context,
      projectile: this.state.projectile,
      updateStepContext: (payload) => this.updateStepContext(stepState.id, payload),
      select: () => this.selectStep(stepState.id),
      submit: (name?: string) => this.submitStep(stepState.id, name),
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
      projectile: this.props.buildProjectile(newArray),
    });
  }

  private submitStep(id: string, name?: string) {
    if (typeof name === 'string') {
      this.props.submit({ target: name, projectile: this.state.projectile });
      return;
    }
    const nextStep = findNextStep(this.getStepIds(), id);
    if (nextStep) {
      this.selectStep(nextStep);
    }
  }
}

export default SmartWizard;
