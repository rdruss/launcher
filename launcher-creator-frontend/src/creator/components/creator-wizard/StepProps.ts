export interface StepProps<T> {
  stepId: string;
  context: T;
  valid: boolean;
  current: boolean;
  locked: boolean;
  select: () => void;
  submit: () => void;
  updateStepContext: (payload: {context: T; valid: boolean}) => void;
}