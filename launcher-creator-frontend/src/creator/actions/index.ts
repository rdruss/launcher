import { action } from '../../utils/Actions';
import { Capability, Runtime, WizardStepId } from '../states';

export enum AuthenticationAction {
  AUTHENTICATE = 'AUTHENTICATE',
  USER_CONNECTED = 'AUTHENTICATION_USER_CONNECTED',
  USER_NOT_CONNECTED = 'AUTHENTICATION_USER_NOT_CONNECTED',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export const authenticationAction = {
  authenticate: () => action(AuthenticationAction.AUTHENTICATE, {}),
  login: () => action(AuthenticationAction.LOGIN, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  logout: () => action(AuthenticationAction.LOGOUT, {}),
};

export enum ApiAction {
  FETCH_CAPABILITIES = 'API_FETCH_CAPABILITIES',
  FETCH_RUNTIMES = 'API_FETCH_RUNTIMES',
}

export const apiAction = {
  fetchCapabilities: () => action(ApiAction.FETCH_CAPABILITIES, { request: { url: `/capabilities` } }),
  fetchRuntimes: () => action(ApiAction.FETCH_RUNTIMES, { request: { url: `/runtimes` } })
};

export enum WizardAction {
  SELECT_TITLE = 'WIZARD_SELECT_TITLE',
  SELECT_RUNTIME = 'WIZARD_SELECT_RUNTIME',
  ADD_CAPABILITY = 'WIZARD_ADD_CAPABILITY',
  GO_TO_STEP = 'WIZARD_GO_TO_STEP',
}

export const wizardAction = {
  selectTitle: (title: string) => action(WizardAction.SELECT_TITLE, {title}),
  selectRuntime: (runtime: Runtime) => action(WizardAction.SELECT_RUNTIME, {runtime}),
  addCapability: (capability: Capability) => action(WizardAction.ADD_CAPABILITY, {capability}),
  goToStep: (stepId: WizardStepId) => action(WizardAction.GO_TO_STEP, {stepId}),
};


