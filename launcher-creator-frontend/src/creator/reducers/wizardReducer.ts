import { WizardAction } from '../actions';
import { StepState, WizardState, WizardStepId, WizardStepIds } from '../states/WizardState';
import { createSelector } from 'reselect';
import { AppState } from '../states';

// Reducer

const INITIAL_STATE: WizardState = {
  current: WizardStepId.NAME_STEP,
  steps: {},
  valid: false,
};

const wizardReducer = (state: WizardState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case WizardAction.UPDATE_STEP_CONTEXT:
      const payload = action.payload;
      newState = {...state,
        steps: {...state.steps, [action.stepId]: { valid: payload.valid, context: payload.context}},
      };
      break;
    case WizardAction.GO_TO_STEP:
      newState = { ...state, current: action.stepId };
      break;
  }
  if (WizardStepIds.map(stepId => Boolean(newState.steps[stepId] && newState.steps[stepId].valid)).every(v => v)) {
    newState.valid = true;
  }
  return newState;
};

// Selectors

export interface PropsWithStepId {
  stepId: string;
}

const getWizardState = (state:AppState) => state.wizard;

const getStepId =  (_, { stepId }: PropsWithStepId) => stepId;

function getWizardStepState(wizardState, stepId): StepState<any> {
  return wizardState.steps[stepId] || { valid: false };
}

export function getStepState(stepId) {
  return createSelector(
    [getWizardState],
    (wizardState) => getWizardStepState(wizardState, stepId)
  );
}

export const getThisStepState = createSelector(
  [getWizardState, getStepId],
  getWizardStepState
);

export const getThisStepStateContext = createSelector(
  [getThisStepState],
  (stepState) => stepState.context
);


export const isThisStepValid = createSelector([getThisStepState], state => state && state.valid);

export const isThisCurrentStep = createSelector(
  [getWizardState, getStepId],
  (wizardState, stepId) => wizardState.current === stepId
);

function isPreviousStepValid(wizardState: WizardState, stepId: string) {
  const index = WizardStepIds.indexOf(stepId);
  if (index <= 0) {
    return true;
  }
  const prevStep = wizardState.steps[WizardStepIds[index - 1]];
  return prevStep && prevStep.valid;
}

export const isThisStepLocked = createSelector(
  [getWizardState, getStepId],
  (s, id) => !isPreviousStepValid(s, id)
);






export default wizardReducer;
