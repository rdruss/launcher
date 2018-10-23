import { WizardAction } from '../actions/index';
import { StepState, WizardState } from '../states/WizardState';
import { AppState } from '../states/index';
import * as _ from 'lodash';
import { oc, OCType } from 'ts-optchain';

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
        stepStates: {...state.stepStates, [action.stepId]: { completed: payload.completed, context: payload.context}},
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
    case WizardAction.RESET:
      newState = { ...INITIAL_STATE, steps: action.steps, current: action.current };
      break;
  }
  if (state.steps.map(stepId => Boolean(newState.stepStates[stepId] && newState.stepStates[stepId].completed)).every(v => v)) {
    newState.valid = true;
  }
  return newState;
};

// Selectors

export const getWizardState = (state:AppState) => state.wizard;

export function getStepContext<T>(state: AppState, stepId: string): OCType<T> {
  return oc(getWizardStepState(state, stepId)).context as OCType<T>;
}

export function getWizardStepState(state:AppState, stepId: string): StepState<any> {
  return getWizardState(state).stepStates[stepId] || { valid: false };
}

export default wizardReducer;
