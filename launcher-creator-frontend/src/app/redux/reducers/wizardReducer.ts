import { WizardActions } from '../actions/wizardActions';
import { WizardState } from '../states/WizardState';
import { AppState } from '../states';

// Reducer

const INITIAL_STATE: WizardState = {
  data: undefined,
};

const wizardReducer = (state: WizardState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case WizardActions.SAVE:
      newState = { ...state, data: action.payload};
      break;
    case WizardActions.RESET:
      newState = { ...INITIAL_STATE };
      break;
  }
  return newState;
};

// Selectors

export const getWizardState = (state:AppState) => state.wizard;

export default wizardReducer;
