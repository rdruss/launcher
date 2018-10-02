export interface StepState<T> {
  valid: boolean;
  context?: T;
}

export interface WizardState {
  current?: string;
  stepStates: {[s: string]: StepState<any>;};
  steps: string[];
  valid: boolean;
}
