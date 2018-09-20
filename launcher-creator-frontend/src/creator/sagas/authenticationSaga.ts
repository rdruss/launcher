import { call, put, takeEvery } from 'redux-saga/effects';

import { authenticationAction, AuthenticationAction } from '../actions';
import { KeycloakAuthentication, OptionalUser } from '../../authentication/KeycloakAuthentication';
import { KeycloakConfig } from '../../authentication/KeycloakConfig';

const config = new KeycloakConfig();
const keycloakService = new KeycloakAuthentication(config);

function* authenticationRequest(action) {
  try {
    const user:OptionalUser = yield call(keycloakService.init, action.payload);
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
  yield takeEvery(AuthenticationAction.LOGIN, loginRequest);
  yield takeEvery(AuthenticationAction.LOGOUT, logoutRequest);
}
