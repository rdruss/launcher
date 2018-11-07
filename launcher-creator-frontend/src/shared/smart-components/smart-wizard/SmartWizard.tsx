import * as React from 'react';
import { Component } from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { findNextStep, findPrevStep } from './SmartWizardHelper';
import Wizard from '../../components/wizard';
import { getSmartWizardState } from './smartWizardReducer';
import { SmartWizardState } from './SmartWizardState';
import { smartWizardActions } from './smartWizardActions';

export interface StepDefinition {
  id: string;
  component: ConnectedComponentClass<any, any>;
}

export interface WizardDefinition {
  [id: string]:StepDefinition;
}

export interface Step {
  id: string;
  completed: boolean;
  context?: any;
}

export interface WizardData {
  current: string;
  steps: Step[];
  projectile: any;
}

interface SmartWizardComponentProps {
  definition: WizardDefinition;
  data?: WizardData;
  buildProjectile(steps: Step[]): any;
  save(payload): void;
  submit(payload): void;
  reset(): void;
}


class SmartWizardComponent extends Component<SmartWizardComponentProps> {
  private wizardData:WizardData;

  constructor(props) {
    super(props);
    this.computeWizardDataFromProps();
  }

  public render() {
    this.computeWizardDataFromProps();
    return (
      <React.Fragment>
        <Wizard>
          {this.wizardData.steps.map(step => {
            return React.createElement((this.props.definition[step.id] as StepDefinition).component, this.getStepProps(step));
          })}
        </Wizard>
      </React.Fragment>
    );
  }

  private computeWizardDataFromProps() {
    const steps = (this.props.data && this.props.data.steps) || this.buildStepsFromDefinition();
    if (steps.length === 0) {
      throw new Error('Invalid step definition');
    }
    this.wizardData = {
      steps,
      current: (this.props.data && this.props.data.current) || steps[0].id,
      projectile: (this.props.data && this.props.data.projectile) || {},
    };
  }

  private buildStepsFromDefinition(): Step[] {
    return Object.keys(this.props.definition).map(id => ({id, completed: false}));
  }

  private isPreviousStepCompleted(step: string): boolean {
    const prevStep = this.getPreviousStep(step);
    if (!prevStep) {
      return true;
    }
    return prevStep.completed;
  }

  private getPreviousStep(step: string): Step | undefined {
    const prevStep = findPrevStep(this.getStepIds(), step);
    return this.getStepState(prevStep);
  }

  private getStepState(id?: string): Step | undefined {
    return this.wizardData.steps.find(s => s.id === id);
  }

  private getStepIds() {
    return this.wizardData.steps.map(s => s.id);
  }

  private getStepProps(step: Step) {
    return ({
      key: step.id,
      stepId: step.id,
      status: {
        completed: step.completed,
        locked: !this.isPreviousStepCompleted(step.id),
        selected: step.id === this.wizardData.current,
        enabled: true,
      },
      context: step.context,
      projectile: this.wizardData.projectile,
      updateStepContext: (payload) => this.updateStepContext(step.id, payload),
      select: () => this.selectStep(step.id),
      submit: (name?: string) => this.submitStep(step.id, name),
    });
  }

  private selectStep = (id: string) => {
    this.props.save({ ...this.wizardData, current: id });
  }

  private updateStepContext = (id: string, payload: {context: any; completed: boolean}) => {
    const index = this.wizardData.steps.findIndex(s => s.id === id);
    if (index < 0) {
      return;
    }
    const newArray = [...this.wizardData.steps];
    const prev = this.wizardData.steps[index];
    newArray[index] = {
      ...prev,
      completed: payload.completed,
      context: payload.context,
    };
    this.props.save({ ...this.props.data, steps: newArray, projectile: this.props.buildProjectile(newArray) });
  }

  private submitStep = (id: string, name?: string) => {
    if (typeof name === 'string') {
      this.props.submit({ target: name, projectile: this.wizardData.projectile });
      return;
    }
    const nextStep = findNextStep(this.getStepIds(), id);
    if (nextStep) {
      this.selectStep(nextStep);
    }
  }
}

const mapStateToProps = (state: { smartWizard: SmartWizardState }) => ({
  data: getSmartWizardState(state).data,
});

const mapDispatchToProps = (dispatch) => ({
  save: (payload) => dispatch(smartWizardActions.save(payload)),
  reset: () => dispatch(smartWizardActions.reset()),
});

const SmartWizard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmartWizardComponent);

export default SmartWizard;
