import { action } from '../../../shared/utils/Actions';

export enum AuthenticationAction {
  DISABLE = 'AUTHENTICATION_DISABLE',
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
  disable: () => action(AuthenticationAction.DISABLE, {}),
  authenticate: () => action(AuthenticationAction.AUTHENTICATE, {}),
  login: () => action(AuthenticationAction.LOGIN, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  refreshToken: () => action(AuthenticationAction.REFRESH_TOKEN, {}),
  logout: () => action(AuthenticationAction.LOGOUT, {}),
  openAccountManagement: () => action(AuthenticationAction.OPEN_ACCOUNT_MANAGEMENT, {}),
};