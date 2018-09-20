export interface StepProps {
  valid: boolean;
  current: boolean;
  locked: boolean;
  goToStep: (step?: string) => void;
}