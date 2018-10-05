import { WizardAction } from '../actions';
import { StepState, WizardState } from '../states/WizardState';
import { createSelector } from 'reselect';
import { AppState } from '../states';
import * as _ from 'lodash';

// Reducer

const INITIAL_STATE: WizardState = {
  stepStates: {},
  steps: [],
  submission: {
    loading: false,
    completed: false,
  },
  valid: false,
};

const wizardReducer = (state: WizardState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case WizardAction.UPDATE_STEP_CONTEXT:
      const payload = action.payload;
      newState = {...state,
        stepStates: {...state.stepStates, [action.stepId]: { valid: payload.valid, context: payload.context}},
      };
      break;
    case WizardAction.GO_TO_STEP:
      newState = { ...state, current: action.stepId };
      break;
    case WizardAction.SET_STEPS:
      newState = { ...state, steps: action.steps, current: action.current };
      break;
    case WizardAction.SUBMIT:
      newState = { ...state, submission: { loading: true, completed: false, payload: action.payload } };
      break;
    case WizardAction.SUBMIT_SUCCESS:
      newState = { ...state, submission: { ...state.submission,
          loading: false,
          completed: true,
          result: action.result,
          error: undefined
      }};
      break;
    case WizardAction.SUBMIT_FAILURE:
      newState = { ...state, submission: { ...state.submission,
          loading: false,
          completed: true,
          error: action.error,
          result: undefined
      }};
      break;
  }
  if (state.steps.map(stepId => Boolean(newState.stepStates[stepId] && newState.stepStates[stepId].valid)).every(v => v)) {
    newState.valid = true;
  }
  return newState;
};

// Selectors

export interface PropsWithStepId {
  stepId: string;
}

export const getWizardState = (state:AppState) => state.wizard;

export function getStepContextValue(state: AppState, stepId: string, key: string, defaultValue?: any) {
  return _.get(getWizardState(state).stepStates, `${stepId}.context.${key}`, defaultValue);
}

const getStepId =  (state, { stepId }: PropsWithStepId) => stepId;

function getWizardStepState(wizardState, stepId): StepState<any> {
  return wizardState.stepStates[stepId] || { valid: false };
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

export const getSteps = createSelector(
  [getWizardState],
  (wizardState) => wizardState.steps
);


export const isThisStepValid = createSelector([getThisStepState], state => state && state.valid);

export const isThisCurrentStep = createSelector(
  [getWizardState, getStepId],
  (wizardState, stepId) => wizardState.current === stepId
);

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

function isPreviousStepValid(wizardState: WizardState, stepId: string) {
  const prevStep = findPrevStep(wizardState.steps, stepId);
  if (!prevStep) {
    return true;
  }
  const prevStepState = wizardState.stepStates[prevStep];
  return prevStepState && prevStepState.valid;
}

export const isThisStepLocked = createSelector(
  [getWizardState, getStepId],
  (s, id) => !isPreviousStepValid(s, id)
);





export default wizardReducer;
