import Capability from '../models/Capability';
import Runtime from '../models/Runtime';
import OpenShiftCluster from '../models/OpenShiftCluster';

export enum WizardStepId {
  TITLE_STEP = 'titleStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  REPOSITORY_STEP = 'repositoryStep',
  DEPLOYMENT_STEP = 'deploymentStep',
}

export interface TitleStepState {
  title?: string;
  valid: boolean;
}

export const TITLE_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}$');

export interface RuntimeStepState {
  runtime?: Runtime;
  valid: boolean;
}

export interface CapabilitiesStepState {
  capabilities: Set<Capability>;
  valid: boolean;
}

export interface DeploymentStepState {
  cluster?: OpenShiftCluster;
  valid: boolean;
}

export const REPOSITORY_REGEXP = new RegExp('^[a-z][a-z0-9-.]{3,63}/[a-z][a-z0-9-.]{3,63}$');

export interface RepositoryStepState {
  repository?: string;
  valid: boolean;
}

export interface WizardState {
  current: WizardStepId;
  titleStep: TitleStepState;
  runtimeStep: RuntimeStepState;
  capabilitiesStep: CapabilitiesStepState;
  deploymentStep: DeploymentStepState;
  repositoryStep: RepositoryStepState;
  valid: boolean;
}
