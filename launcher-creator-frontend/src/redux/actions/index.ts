import { action } from '../utils/Actions';

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
  FETCH_CAPABILITIES = 'FETCH_CAPABILITIES',
  FETCH_RUNTIMES = 'FETCH_RUNTIMES',
}

export const apiAction = {
  fetchCapabilities: () => action(ApiAction.FETCH_CAPABILITIES, { request: { url: `/capabilities` } }),
  fetchRuntimes: () => action(ApiAction.FETCH_RUNTIMES, { request: { url: `/runtimes` } })
};


