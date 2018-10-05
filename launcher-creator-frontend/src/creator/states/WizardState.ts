export interface StepState<T> {
  completed: boolean;
  context?: T;
}

export interface StepStateMap {
  [s: string]: StepState<any>;
}

export interface WizardState {
  current?: string;
  stepStates: StepStateMap;
  steps: string[];
  submission: {
    payload?: any;
    result?: any;
    error?: string;
    completed: boolean;
    loading: boolean;
  };
  valid: boolean;
}
