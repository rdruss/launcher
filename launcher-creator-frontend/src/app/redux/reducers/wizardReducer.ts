import { WizardAction } from '../actions';
import { WizardState } from '../states/WizardState';
import { AppState } from '../states';

// Reducer

const INITIAL_STATE: WizardState = {
  data: undefined,
  submission: {
    loading: false,
    completed: false,
  },
};

const wizardReducer = (state: WizardState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case WizardAction.SAVE:
      newState = { ...state, data: action.payload};
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
      newState = { ...INITIAL_STATE, data: undefined };
      break;
    case WizardAction.RESET_SUBMISSION:
      newState = { ...state, submission: { loading: false, completed: false } };
      break;
  }
  return newState;
};

// Selectors

export const getWizardState = (state:AppState) => state.wizard;

export default wizardReducer;
