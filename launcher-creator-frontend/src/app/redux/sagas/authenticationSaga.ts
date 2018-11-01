import { call, put, takeEvery, throttle } from 'redux-saga/effects';

import { AuthenticationAction, authenticationAction } from '../actions/authenticationActions';
import { newKeycloakAuthenticationApi } from '../../api';
import { OptionalUser } from '../../api/authentication/AuthenticationApi';


const authenticationApi = newKeycloakAuthenticationApi();

function* authenticationRequest(action) {
  try {
    const user: OptionalUser = yield call(authenticationApi.init, action.payload);
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
    const user: OptionalUser = yield call(authenticationApi.refreshToken, action.payload);
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
    yield call(authenticationApi.login, action.payload);
    yield put(authenticationAction.authenticate());
  } catch (e) {
    yield put(authenticationAction.authenticationFailure(e));
  }
}

function* openAccountManagementRequest(action) {
  try {
    yield call(authenticationApi.openAccountManagement, action.payload);
  } catch (e) {
    console.error(e);
  }
}

function* logoutRequest(action) {
  try {
    yield call(authenticationApi.logout, action.payload);
    yield put(authenticationAction.authenticate());
  } catch (e) {
    console.error(e);
  }
}

export default function* authenticationSaga() {
  if(!authenticationApi.enabled) {
    yield put(authenticationAction.disable(authenticationApi.user!.token));
    return;
  }
  yield takeEvery(AuthenticationAction.AUTHENTICATE, authenticationRequest);
  yield takeEvery(AuthenticationAction.OPEN_ACCOUNT_MANAGEMENT, openAccountManagementRequest);
  yield throttle(10000, AuthenticationAction.REFRESH_TOKEN, refreshTokenRequest);
  yield takeEvery(AuthenticationAction.LOGIN, loginRequest);
  yield takeEvery(AuthenticationAction.LOGOUT, logoutRequest);
}
