export interface WizardState {
  data: any;
  submission: {
    payload?: any;
    result?: any;
    error?: string;
    completed: boolean;
    loading: boolean;
  };
}
