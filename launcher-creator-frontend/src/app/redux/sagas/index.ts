import { all } from 'redux-saga/effects';
import authenticationSaga from './authenticationSaga';
import launchSaga from './launchSaga';
import fetchSaga from './fetchSaga';


export default function* sagas() {
  yield all([authenticationSaga(), launchSaga(), fetchSaga()]);
}
