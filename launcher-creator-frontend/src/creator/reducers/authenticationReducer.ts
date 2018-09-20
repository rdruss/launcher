import { AuthenticationAction } from '../actions';
import { AuthenticationState } from '../states/AuthenticationState';

const INITIAL_STATE: AuthenticationState = {
  error: false,
  authenticated: false,
  inProgress: false,
};

// This Reducer allows changes to the 'AuthenticationReducer' portion of Redux Store
const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action) => {
  switch (action.type) {
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

export default authenticationReducer;
