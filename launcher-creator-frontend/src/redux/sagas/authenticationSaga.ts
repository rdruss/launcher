import { call, put, takeEvery } from 'redux-saga/effects';

import { authentication, AuthenticationAction } from '../actions';
import { KeycloakAuthenticationService, OptionalUser } from '../../service/auth/KeycloakAuthenticationService';
import { KeycloakConfig } from '../../service/auth/KeycloakConfig';

const config = new KeycloakConfig();
const keycloakService = new KeycloakAuthenticationService(config);

function* authenticationRequest(action) {
  try {
    const user:OptionalUser = yield call(keycloakService.init, action.payload);
    if (user) {
      yield put(authentication.userConnected(user));
    } else {
      yield put(authentication.userNotConnected());
    }
  } catch (e) {
    yield put(authentication.authenticationFailure(e));
  }
}

function* loginRequest(action) {
  try {
    yield call(keycloakService.login, action.payload);
  } catch (e) {
    yield put(authentication.authenticationFailure(e));
  }
}

function* logoutRequest(action) {
  try {
    yield call(keycloakService.logout, action.payload);
  } catch (e) {
    yield put(authentication.authenticationFailure(e));
  }
}

export default function* watchAuthentication() {
  yield takeEvery(AuthenticationAction.AUTHENTICATION_REQUEST, authenticationRequest);
  yield takeEvery(AuthenticationAction.LOGIN_REQUEST, loginRequest);
  yield takeEvery(AuthenticationAction.LOGOUT_REQUEST, logoutRequest);
}
