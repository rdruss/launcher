// Store is the Redux Data states

export interface GlobalState {
}

export interface AuthenticationState {
  token?: string;
  userName?: string;
  userPreferredName?: string
  error: any;
  message?: string;
  authenticated: boolean;
  inProgress: boolean;
  sessionTimeOut?: Date;
}

export interface IdAndName {
  id: string;
  name: string;
}

export interface Runtime {
  id: string;
  language: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Capability {
  module: string;
  name: string;
  description: string;
  props: {
    runtime?: {
      values: [IdAndName];
    }
  };
}

export interface FetchState<T> {
  data: T;
  error: string;
  pending: number;
}

export enum WizardStepId {
  TITLE_STEP = 'title-step',
  RUNTIME_STEP = 'runtime-step',
  CAPABILITIES_STEP = 'capabilities-step',
  REPOSITORY_STEP = 'repository-step'
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

export interface WizardState {
  current: WizardStepId;
  titleStep: TitleStepState;
  runtimeStep: RuntimeStepState;
  capabilitiesStep: CapabilitiesStepState;
  valid: boolean;
}

// This defines the  Global Application State
export interface AppState {
  globalState: GlobalState;
  authentication: AuthenticationState;
  capabilities: FetchState<[Capability]>;
  runtimes: FetchState<[Runtime]>;
  wizard: WizardState;
}
