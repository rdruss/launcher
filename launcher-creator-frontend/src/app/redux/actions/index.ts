import { action } from '../../../shared/utils/Actions';

export enum AuthenticationAction {
  AUTHENTICATE = 'AUTHENTICATE',
  USER_CONNECTED = 'AUTHENTICATION_USER_CONNECTED',
  USER_NOT_CONNECTED = 'AUTHENTICATION_USER_NOT_CONNECTED',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  REFRESH_TOKEN = 'AUTHENTICATION_REFRESH_TOKEN',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  OPEN_ACCOUNT_MANAGEMENT = 'OPEN_ACCOUNT_MANAGEMENT',
}

export const authenticationAction = {
  authenticate: () => action(AuthenticationAction.AUTHENTICATE, {}),
  login: () => action(AuthenticationAction.LOGIN, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  refreshToken: () => action(AuthenticationAction.REFRESH_TOKEN, {}),
  logout: () => action(AuthenticationAction.LOGOUT, {}),
  openAccountManagement: () => action(AuthenticationAction.OPEN_ACCOUNT_MANAGEMENT, {}),
};

export enum ApiAction {
  FETCH_CAPABILITIES = 'API_FETCH_CAPABILITIES',
  FETCH_RUNTIMES = 'API_FETCH_RUNTIMES',
  FETCH_CLUSTERS = 'API_FETCH_CLUSTERS',
  FETCH_GIT_USER = 'API_FETCH_GIT_USER',
}

export const apiAction = {
  fetchCapabilities: () => action(ApiAction.FETCH_CAPABILITIES, { request: { url: `/capabilities` } }),
  fetchRuntimes: () => action(ApiAction.FETCH_RUNTIMES, { request: { url: `/runtimes` } }),
  fetchClusters: () => action(ApiAction.FETCH_CLUSTERS, {
    request: { url: `/services/openshift/clusters`, headers: {'X-App': 'launcher'} },
    meta: { driver: 'launcher' },
  }),
  fetchGitUser: () => action(ApiAction.FETCH_GIT_USER, {
    request: { url: `/services/git/user`, headers: {'X-App': 'launcher', 'X-Git-Provider': 'GitHub'} },
    meta: { driver: 'launcher' },
  }),
};

export enum WizardAction {
  SAVE = 'WIZARD_SAVE',
  RESET = 'WIZARD_RESET',
  SUBMIT = 'WIZARD_SUBMIT',
  SUBMIT_SUCCESS = 'WIZARD_SUBMIT_SUCCESS',
  SUBMIT_FAILURE = 'WIZARD_SUBMIT_FAILURE',
}

export const wizardAction = {
  save: (payload) => action(WizardAction.SAVE, {payload}),
  reset: () => action(WizardAction.RESET, {}),
  submit: (payload) => action(WizardAction.SUBMIT, {payload}),
  submitSuccess: (result) => action(WizardAction.SUBMIT_SUCCESS, {result}),
  submitFailure: (error) => action(WizardAction.SUBMIT_FAILURE, {error}),
};
