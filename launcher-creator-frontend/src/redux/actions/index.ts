import { action } from '../utils/Actions';

export enum AuthenticationAction {
  AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST',
  USER_CONNECTED = 'AUTHENTICATION_USER_CONNECTED',
  USER_NOT_CONNECTED = 'AUTHENTICATION_USER_NOT_CONNECTED',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST'
};

export const authentication = {
  authenticationRequest: () => action(AuthenticationAction.AUTHENTICATION_REQUEST, {}),
  loginRequest: () => action(AuthenticationAction.LOGIN_REQUEST, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  logoutRequest: () => action(AuthenticationAction.LOGOUT_REQUEST, {}),
};




