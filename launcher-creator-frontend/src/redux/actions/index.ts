import { action } from '../utils/Actions';

export enum AuthenticationAction {
  AUTHENTICATE = 'AUTHENTICATE',
  USER_CONNECTED = 'AUTHENTICATION_USER_CONNECTED',
  USER_NOT_CONNECTED = 'AUTHENTICATION_USER_NOT_CONNECTED',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export const authentication = {
  authenticate: () => action(AuthenticationAction.AUTHENTICATE, {}),
  login: () => action(AuthenticationAction.LOGIN, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  logout: () => action(AuthenticationAction.LOGOUT, {}),
};

export enum CapabilitiesAction {
  FETCH_CAPABILITIES = 'FETCH_CAPABILITIES',
}

export const capabilities = {
  fetch: () => action(CapabilitiesAction.FETCH_CAPABILITIES, { request: { url: `/capabilities` } })
};



