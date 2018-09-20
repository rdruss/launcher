import { WizardAction } from '../actions';
import { TITLE_REGEXP, WizardState, WizardStepId } from '../states/WizardState';
import Capability from '../models/Capability';

const INITIAL_STATE: WizardState = {
  current: WizardStepId.TITLE_STEP,
  titleStep: { valid: false },
  runtimeStep: { valid: false },
  capabilitiesStep: { capabilities: new Set<Capability>(), valid: false },
  destinationStep: { valid: false },
  valid: false,
};

const wizardReducer = (state: WizardState = INITIAL_STATE, action) => {
  let newState = state;
  const capabilities = new Set(state.capabilitiesStep.capabilities);
  switch (action.type) {
    case WizardAction.SELECT_TITLE:
      newState = { ...state, titleStep: { title: action.title, valid: (action.title && TITLE_REGEXP.test(action.title)) } };
      break;
    case WizardAction.SELECT_RUNTIME:
      newState = { ...state, runtimeStep: { runtime: action.runtime, valid: true } };
      break;
    case WizardAction.ADD_CAPABILITY:
      capabilities.add(action.capability)
      newState = { ...state, capabilitiesStep: { capabilities, valid: capabilities.size > 0 } };
      break;
    case WizardAction.REMOVE_CAPABILITY:
      capabilities.delete(action.capability);
      newState = { ...state, capabilitiesStep: { capabilities, valid: capabilities.size > 0 } };
      break;
    case WizardAction.GO_TO_STEP:
      newState = { ...state, current: action.stepId };
      break;
  }
  if (newState.titleStep.valid && newState.runtimeStep.valid && newState.capabilitiesStep.valid) {
    newState.valid = true;
  }
  return newState;
};

export default wizardReducer;
