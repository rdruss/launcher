import { action } from '../../utils/Actions';

export enum SmartWizardActions {
  SAVE = 'SMART_WIZARD_SAVE',
  RESET = 'SMART_WIZARD_RESET',
}

export const smartWizardActions = {
  save: (payload) => action(SmartWizardActions.SAVE, {payload}),
  reset: () => action(SmartWizardActions.RESET, {}),
};