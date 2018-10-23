export interface StepStatus {
  completed: boolean;
  locked: boolean;
  selected: boolean;
}

export interface StepProps<T> {
  stepId: string;
  context: T;
  status: StepStatus;
  select: () => void;
  submit: (name?: string) => void;
  updateStepContext: (payload: {context: T; completed: boolean}) => void;
}