import { call, put, takeEvery, throttle } from 'redux-saga/effects';

import { AuthenticationAction } from '../actions/authenticationActions';
import { KeycloakAuthenticationApi, KeycloakConfig, OptionalUser } from '../../api/authentication/KeycloakAuthenticationApi';
import { checkNotNull } from '../../../shared/utils/Preconditions';
import { authenticationAction } from '../actions/authenticationActions';

let config: KeycloakConfig;
if (process.env.REACT_APP_KEYCLOAK_CLIENT_ID) {
  config = {
    enabled: true,
    clientId: checkNotNull(process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 'process.env.REACT_APP_KEYCLOAK_CLIENT_ID'),
    realm: checkNotNull(process.env.REACT_APP_KEYCLOAK_REALM, 'process.env.REACT_APP_KEYCLOAK_REALM'),
    url: checkNotNull(process.env.REACT_APP_KEYCLOAK_URL, 'process.env.REACT_APP_KEYCLOAK_URL'),
  };
} else {
  config = {
    enabled: false,
  };
}


const keycloakService = new KeycloakAuthenticationApi(config);

function* authenticationRequest(action) {
  try {
    const user: OptionalUser = yield call(keycloakService.init, action.payload);
    if (user) {
      yield put(authenticationAction.userConnected(user));
    } else {
      yield put(authenticationAction.userNotConnected());
    }
  } catch (e) {
    yield put(authenticationAction.authenticationFailure(e));
  }
}

export function* refreshTokenRequest(action) {
  try {
    const user: OptionalUser = yield call(keycloakService.refreshToken, action.payload);
    if (user) {
      yield put(authenticationAction.userConnected(user));
    } else {
      yield put(authenticationAction.userNotConnected());
    }
  } catch (e) {
    yield put(authenticationAction.authenticationFailure(e));
  }
}

function* loginRequest(action) {
  try {
    yield call(keycloakService.login, action.payload);
  } catch (e) {
    yield put(authenticationAction.authenticationFailure(e));
  }
}

function* openAccountManagementRequest(action) {
  try {
    yield call(keycloakService.openAccountManagement, action.payload);
  } catch (e) {
    console.error(e);
  }
}

function* logoutRequest(action) {
  try {
    yield call(keycloakService.logout, action.payload);
  } catch (e) {
    console.error(e);
  }
}

export default function* authenticationSaga() {
  yield takeEvery(AuthenticationAction.AUTHENTICATE, authenticationRequest);
  yield takeEvery(AuthenticationAction.OPEN_ACCOUNT_MANAGEMENT, openAccountManagementRequest);
  yield throttle(10000, AuthenticationAction.REFRESH_TOKEN, refreshTokenRequest);
  yield takeEvery(AuthenticationAction.LOGIN, loginRequest);
  yield takeEvery(AuthenticationAction.LOGOUT, logoutRequest);
}
