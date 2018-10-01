import * as _ from 'lodash';

export enum WizardStepId {
  TITLE_STEP = 'titleStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  REPOSITORY_STEP = 'repositoryStep',
  DEPLOYMENT_STEP = 'deploymentStep',
}

export const WizardStepIds = _.values(WizardStepId);

export const TITLE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');
export const REPOSITORY_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}/[a-z][a-z0-9-.]{3,63}$');

export interface StepState<T> {
  valid: boolean;
  context?: T;
}

export interface WizardState {
  current: WizardStepId;
  steps: {[s: string]: StepState<any>;};
  valid: boolean;
}
