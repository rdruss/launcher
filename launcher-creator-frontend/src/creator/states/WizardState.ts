import * as _ from 'lodash';

export enum WizardStepId {
  NAME_STEP = 'nameStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  REPOSITORY_STEP = 'repositoryStep',
  DEPLOYMENT_STEP = 'deploymentStep',
}

export const WizardStepIds = _.values(WizardStepId);

export interface StepState<T> {
  valid: boolean;
  context?: T;
}

export interface WizardState {
  current: WizardStepId;
  steps: {[s: string]: StepState<any>;};
  valid: boolean;
}
