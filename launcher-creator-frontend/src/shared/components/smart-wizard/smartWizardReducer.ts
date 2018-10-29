// Reducer

import { SmartWizardState } from './SmartWizardState';
import { SmartWizardActions } from './smartWizardActions';

const INITIAL_STATE: SmartWizardState = {
  data: undefined,
};

const smartWizardReducer = (state: SmartWizardState = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case SmartWizardActions.SAVE:
      newState = { ...state, data: action.payload};
      break;
    case SmartWizardActions.RESET:
      newState = { ...INITIAL_STATE };
      break;
  }
  return newState;
};

// Selectors

export const getSmartWizardState = (state: { smartWizard: SmartWizardState }) => state.smartWizard;

export default smartWizardReducer;
