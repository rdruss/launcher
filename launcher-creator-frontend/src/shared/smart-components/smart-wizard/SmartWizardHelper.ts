export function findPrevStep(steps: string[], stepId: string): string | undefined {
  const index = steps.indexOf(stepId);
  if(index < 0) {
    throw new Error(`Invalid step: ${stepId}`);
  }
  if (index === 0) {
    return undefined;
  }
  return steps[index - 1];
}

export function findNextStep(steps: string[], stepId: string): string | undefined {
  const index = steps.indexOf(stepId);
  if(index < 0) {
    throw new Error(`Invalid step: ${stepId}`);
  }
  if (index === steps.length - 1) {
    return undefined;
  }
  return steps[index + 1];
}
