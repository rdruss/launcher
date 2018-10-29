import { action } from '../../../shared/utils/Actions';

export enum WizardActions {
  SAVE = 'WIZARD_SAVE',
  RESET = 'WIZARD_RESET',
}

export const wizardActions = {
  save: (payload) => action(WizardActions.SAVE, {payload}),
  reset: () => action(WizardActions.RESET, {}),
};