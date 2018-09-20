import Capability from '../models/Capability';
import Runtime from '../models/Runtime';

export enum WizardStepId {
  TITLE_STEP = 'titleStep',
  RUNTIME_STEP = 'runtimeStep',
  CAPABILITIES_STEP = 'capabilitiesStep',
  DESTINATION_STEP = 'destinationStep',
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

export interface DestinationStepState {
  valid: boolean;
}

export interface WizardState {
  current: WizardStepId;
  titleStep: TitleStepState;
  runtimeStep: RuntimeStepState;
  capabilitiesStep: CapabilitiesStepState;
  destinationStep: DestinationStepState;
  valid: boolean;
}
