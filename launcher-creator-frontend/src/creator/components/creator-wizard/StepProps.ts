export interface StepProps<T> {
  stepId: string;
  context: T;
  valid: boolean;
  current: boolean;
  locked: boolean;
  select: () => void;
  submit: (name?: string) => void;
  updateStepContext: (payload: {context: T; valid: boolean}) => void;
}