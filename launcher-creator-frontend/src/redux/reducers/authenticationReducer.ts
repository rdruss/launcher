import { AuthenticationState } from '../states';
import { AuthenticationAction } from '../actions';

const INITIAL_STATE: AuthenticationState = {
  token: undefined,
  userName: undefined,
  error: false,
  message: '',
  authenticated: false,
  inProgress: false,
  sessionTimeOut: undefined
};

// This Reducer allows changes to the 'AuthenticationReducer' portion of Redux Store
const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthenticationAction.AUTHENTICATION_REQUEST:
    case AuthenticationAction.LOGIN_REQUEST:
    case AuthenticationAction.LOGOUT_REQUEST:
      return Object.assign({}, INITIAL_STATE, {
        inProgress: true,
      });
    case AuthenticationAction.USER_CONNECTED:
      return Object.assign({}, INITIAL_STATE, {
        inProgress: false,
        authenticated: true,
        token: action.response.token,
        userName: action.response.userName,
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
