import { AuthenticationAction } from '../actions/authenticationActions';
import { AuthenticationState } from '../states/index';
import { createSelector } from 'reselect';
import { AppState } from '../states';

const INITIAL_STATE: AuthenticationState = {
  enabled: true,
  error: false,
  authenticated: false,
  inProgress: false,
};

// This Reducer allows changes to the 'AuthenticationReducer' portion of Redux Store
const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action) => {
  if (!state.enabled) {
    return state;
  }
  switch (action.type) {
    case AuthenticationAction.DISABLE:
      return Object.assign({}, INITIAL_STATE, {
        authenticated: true,
        enabled: false,
      });
    case AuthenticationAction.AUTHENTICATE:
    case AuthenticationAction.LOGIN:
    case AuthenticationAction.LOGOUT:
      return Object.assign({}, INITIAL_STATE, {
        inProgress: true,
      });
    case AuthenticationAction.USER_CONNECTED:
      return Object.assign({}, INITIAL_STATE, {
        inProgress: false,
        authenticated: true,
        token: action.response.token,
        userName: action.response.userName,
        userPreferredName: action.response.userPreferredName,
        sessionTimeOut: action.response.sessionTimeOut
      });
    case AuthenticationAction.USER_NOT_CONNECTED:
      return Object.assign({}, INITIAL_STATE, {
        inProgress: false,
      });
    case AuthenticationAction.AUTHENTICATION_FAILURE:
      const message = 'Error connecting to Launcher';
      return Object.assign({}, INITIAL_STATE, {
        inProgress: false,
        error: true,
        message
      });

    default:
      return state;
  }
};

export const getAuthenticationState = (state:AppState) => state.authentication;

export const getToken = createSelector([getAuthenticationState], a => a.token);

export default authenticationReducer;
